from datetime import datetime
from io import BytesIO

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

from models import Analysis

INK = HexColor("#1C211F")
INK2 = HexColor("#5C6661")
INK3 = HexColor("#A3A8A5")
SAGE = HexColor("#5C715E")
CLAY = HexColor("#D4A373")
LINE = HexColor("#E5E2D9")

STATUS_LABEL = {
    "normal": "Normal",
    "attention": "Worth reviewing",
    "urgent": "Discuss soon",
    "borderline": "Borderline",
    "abnormal": "Out of range",
    "unknown": "Not stated",
}

MARGIN = 0.85 * inch
BOTTOM = 1.05 * inch


def _fmt_date(iso: str) -> str:
    try:
        return datetime.fromisoformat(iso).strftime("%d %B %Y, %H:%M UTC")
    except Exception:
        return iso


def build_summary_pdf(analysis: Analysis) -> bytes:
    report = analysis.report
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=LETTER)
    width, height = LETTER
    right = width - MARGIN
    usable = right - MARGIN
    y = height - MARGIN

    def text(content: str, font: str, size: int, colour, leading_extra: float = 3.5, indent: float = 0.0):
        nonlocal y
        c.setFont(font, size)
        c.setFillColor(colour)
        for line in simpleSplit(content, font, size, usable - indent):
            if y < BOTTOM:
                return False
            c.drawString(MARGIN + indent, y, line)
            y -= size + leading_extra
        return True

    # Masthead
    c.setFillColor(SAGE)
    c.roundRect(MARGIN, y - 6, 22, 22, 6, stroke=0, fill=1)
    c.setFillColor(HexColor("#F7F5F0"))
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(MARGIN + 11, y + 1, "C")
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(MARGIN + 32, y, "ClarifyMed")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(INK3)
    c.drawRightString(right, y + 3, "Patient summary for clinical discussion")
    y -= 26
    c.setStrokeColor(INK)
    c.setLineWidth(1.2)
    c.line(MARGIN, y, right, y)
    y -= 24

    # Meta
    doc_type = (report.document_type if report else "") or "Medical report"
    overall = STATUS_LABEL.get(report.overall_status if report else "", "—")
    text(doc_type.upper(), "Helvetica-Bold", 9, SAGE, 6)
    text((report.headline if report else "") or "Report summary", "Helvetica-Bold", 15, INK, 6)
    text(
        f"Source file: {analysis.filename}    |    Analysed: {_fmt_date(analysis.created_at)}"
        f"    |    Overall: {overall}",
        "Helvetica", 8.5, INK2, 8,
    )
    if analysis.patient_context:
        text(f"Patient-provided context: {analysis.patient_context}", "Helvetica-Oblique", 8.5, INK2, 8)
    y -= 8

    def section(title: str):
        nonlocal y
        if y < BOTTOM + 26:
            return False
        c.setStrokeColor(LINE)
        c.setLineWidth(0.7)
        c.line(MARGIN, y + 9, right, y + 9)
        text(title.upper(), "Helvetica-Bold", 8.5, SAGE, 7)
        return True

    # Plain-language summary
    if report and report.patient_summary:
        section("In plain language")
        summary = " ".join(report.patient_summary.split())
        if len(summary) > 1250:
            summary = summary[:1250].rsplit(" ", 1)[0] + "…"
        text(summary, "Helvetica", 9.5, INK, 3.6)
        y -= 10

    # Flagged values
    flagged = [v for v in (report.lab_values if report else []) if v.status in ("abnormal", "borderline")]
    if flagged:
        section("Values outside or near the edge of range")
        c.setFont("Helvetica-Bold", 8)
        c.setFillColor(INK3)
        c.drawString(MARGIN, y, "TEST")
        c.drawString(MARGIN + 2.55 * inch, y, "RESULT")
        c.drawString(MARGIN + 3.75 * inch, y, "REFERENCE")
        c.drawString(MARGIN + 5.35 * inch, y, "STATUS")
        y -= 13
        for v in flagged[:9]:
            if y < BOTTOM:
                break
            c.setFont("Helvetica", 9)
            c.setFillColor(INK)
            c.drawString(MARGIN, y, v.name[:36])
            c.drawString(MARGIN + 2.55 * inch, y, f"{v.value} {v.unit}".strip()[:16])
            c.setFillColor(INK2)
            c.drawString(MARGIN + 3.75 * inch, y, (v.reference_range or "—")[:22])
            c.setFillColor(HexColor("#A84C32") if v.status == "abnormal" else HexColor("#A8763E"))
            c.drawString(MARGIN + 5.35 * inch, y, STATUS_LABEL.get(v.status, v.status))
            y -= 14
        y -= 6

    # Questions for the doctor
    questions = (report.questions_for_doctor if report else [])[:6]
    if questions:
        section("Questions the patient would like to ask")
        for i, q in enumerate(questions, start=1):
            if y < BOTTOM:
                break
            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(SAGE)
            c.drawString(MARGIN, y, f"{i}.")
            text(" ".join(q.split()), "Helvetica", 9.5, INK, 3.4, indent=16)
            y -= 2
        y -= 6

    # Red flags
    red_flags = (report.red_flags if report else [])[:3]
    if red_flags and y > BOTTOM + 40:
        section("Flagged for prompt attention")
        for flag in red_flags:
            if y < BOTTOM:
                break
            text(f"— {' '.join(flag.split())}", "Helvetica", 9.5, HexColor("#A84C32"), 3.4)

    # Footer
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(MARGIN, BOTTOM - 14, right, BOTTOM - 14)
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(CLAY)
    c.drawString(MARGIN, BOTTOM - 28, "NOT MEDICAL ADVICE")
    c.setFont("Helvetica", 7.5)
    c.setFillColor(INK2)
    for i, line in enumerate(
        simpleSplit(
            "This one-page summary was generated by ClarifyMed, an AI tool that translates medical "
            "documents into plain language for patients. It is not a diagnosis and may contain errors "
            "or omissions. Please read it alongside the original report.",
            "Helvetica", 7.5, usable,
        )
    ):
        c.drawString(MARGIN, BOTTOM - 40 - i * 9.5, line)

    c.showPage()
    c.save()
    return buffer.getvalue()
