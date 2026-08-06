import json
import os
import re
from typing import Optional

from emergentintegrations.llm.chat import (
    FileContentWithMimeType,
    LlmChat,
    StreamDone,
    TextDelta,
    UserMessage,
)

from models import Report

ANALYSIS_PROVIDER = "gemini"
ANALYSIS_MODEL = "gemini-3.1-pro-preview"
CHAT_PROVIDER = "gemini"
CHAT_MODEL = "gemini-3-flash-preview"

SAFETY_RULES = (
    "You are a careful medical-literacy assistant. You explain medical documents to patients in "
    "plain, everyday language at roughly an 8th-grade reading level. You never diagnose, never "
    "prescribe, never recommend or change medication doses, and you always point the patient back "
    "to a qualified clinician for decisions. You are calm and reassuring: you do not catastrophise, "
    "but you never hide a value that is out of range."
)

ANALYSIS_SYSTEM = SAFETY_RULES + (
    "\n\nYou will receive a patient's uploaded medical document (usually a lab report). "
    "First transcribe/extract the meaningful text of the document, then explain it. "
    "Respond with a single valid JSON object and nothing else — no markdown fences, no commentary."
)

ANALYSIS_SCHEMA = """
Return JSON with exactly this shape:

{
  "document_type": "short label, e.g. 'Complete Blood Count' or 'Lipid panel'",
  "overall_status": "normal" | "attention" | "urgent",
  "headline": "one short sentence (max 90 chars) capturing the overall picture",
  "patient_summary": "2-4 short paragraphs of plain language explaining what this report says. No jargon without explaining it.",
  "document_text": "the meaningful text extracted from the document, condensed to at most 3000 characters",
  "key_findings": [
    {
      "title": "short finding name",
      "explanation": "1-3 sentences in plain language explaining what it means for the patient",
      "status": "normal" | "borderline" | "abnormal",
      "importance": "low" | "medium" | "high"
    }
  ],
  "lab_values": [
    {
      "name": "test name as printed",
      "value": "measured value as printed",
      "unit": "unit as printed, empty string if none",
      "reference_range": "reference range as printed, empty string if not shown",
      "status": "normal" | "borderline" | "abnormal" | "unknown",
      "plain_meaning": "one short sentence on what this test measures"
    }
  ],
  "questions_for_doctor": ["4-6 specific, useful questions this patient should ask their doctor about THIS report"],
  "next_steps": ["2-4 general, non-prescriptive suggestions, e.g. 'Book a follow-up to recheck this value'"],
  "red_flags": ["values or signs that warrant prompt medical attention; empty array if none"]
}

Rules:
- Extract EVERY lab value you can read from the document into lab_values. Do not invent values.
- If the document is not a medical document, set overall_status to "normal", document_type to
  "Not a medical document", explain that in patient_summary, and leave the arrays empty.
- Never include a diagnosis. Describe, explain, and defer to a clinician.
"""


def _build_chat(provider: str, model: str, session_id: str, system_message: str) -> LlmChat:
    return LlmChat(
        api_key=os.environ.get("EMERGENT_LLM_KEY"),
        session_id=session_id,
        system_message=system_message,
    ).with_model(provider, model)


def _parse_json(raw: str) -> dict:
    text = (raw or "").strip()
    text = re.sub(r"^```(?:json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start, end = text.find("{"), text.rfind("}")
        if start == -1 or end <= start:
            raise
        return json.loads(text[start:end + 1])


async def analyse_document(
    session_id: str,
    file_path: str,
    mime_type: str,
    patient_context: str = "",
) -> tuple[Report, str]:
    chat = _build_chat(ANALYSIS_PROVIDER, ANALYSIS_MODEL, session_id, ANALYSIS_SYSTEM)
    context_line = (
        f"Patient-provided context: {patient_context.strip()}\n\n"
        if patient_context and patient_context.strip()
        else "No extra patient context was provided.\n\n"
    )
    attachment = FileContentWithMimeType(file_path=file_path, mime_type=mime_type)

    chunks: list[str] = []
    async for event in chat.stream_message(
        UserMessage(
            text=context_line + "Read the attached medical document and analyse it.\n" + ANALYSIS_SCHEMA,
            file_contents=[attachment],
        )
    ):
        if isinstance(event, TextDelta):
            chunks.append(event.content)
        elif isinstance(event, StreamDone):
            break

    data = _parse_json("".join(chunks))
    document_text = str(data.pop("document_text", ""))[:6000]
    return Report.model_validate(data), document_text


def build_followup_chat(session_id: str, report: Optional[Report], document_text: str) -> LlmChat:
    report_json = report.model_dump_json(indent=2) if report else "{}"
    system_message = (
        SAFETY_RULES
        + "\n\nYou are answering follow-up questions about ONE specific report belonging to this "
        "patient. Ground every answer in the report data below. If the answer is not in the report, "
        "say so plainly instead of guessing. Keep answers short (under 150 words), warm, and in "
        "plain language. End with a gentle reminder to confirm with their clinician when the "
        "question touches treatment, medication, or diagnosis.\n\n"
        f"=== STRUCTURED ANALYSIS ===\n{report_json}\n\n"
        f"=== RAW DOCUMENT TEXT ===\n{document_text or '(not available)'}\n"
    )
    return _build_chat(CHAT_PROVIDER, CHAT_MODEL, session_id, system_message)
