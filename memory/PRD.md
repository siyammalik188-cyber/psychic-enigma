# ClarifyMed — Medical AI Assistant

## Original problem statement
"Build a web-based Medical AI Assistant. Homepage: a clean 'Upload Lab Report' area for patients
with a clear disclaimer that this is not medical advice. Results Page: when a PDF is uploaded, use
the platform's Universal Key to extract the text and show a simple-language summary, key findings,
and questions for the patient to ask their doctor. Chat: include a support chat on the results page
where the patient can ask follow-up questions about their report."

Follow-ups: rename the project to **ClarifyMed** (logo + header updated); add a **My History** page.

## Architecture
- **Frontend**: React 18 (CRA) + Tailwind, framer-motion, @phosphor-icons/react, sonner, react-markdown. `/app/frontend`
- **Backend**: FastAPI + Motor/MongoDB. `/app/backend` (`server.py`, `ai.py`, `models.py`, `storage.py`)
- **AI**: `emergentintegrations` LlmChat with the Emergent Universal Key (`EMERGENT_LLM_KEY`).
  - Report analysis: `gemini-3.1-pro-preview` with `FileContentWithMimeType` (PDF/image read directly)
  - Follow-up chat: `gemini-3-flash-preview`, streamed over SSE, grounded on the stored report + extracted text
- **Storage**: Emergent object storage (`medical-ai/uploads/{id}.{ext}`); DB is source of truth, soft delete
- **Design**: `/app/design_guidelines.json` — "Organic & Earthy" (bone white, sage, terracotta), Cormorant Garamond + Manrope
- The previous unrelated Next.js manga site was moved to `/app/archive/`

## Routes
| Frontend | Purpose |
|---|---|
| `/login` | Email/password sign in + create account (public); "Fill in the demo account" helper |
| `/` | Hero + uploader + optional context + recent reports + disclaimer (protected) |
| `/report/:id` | Analysing state → summary, key findings, lab table, doctor questions, next steps, chat, **Share with my doctor** PDF export (protected) |
| `/history` | My History — all of *your* reports with date, top finding, flagged-value count (protected) |

| API | Purpose |
|---|---|
| `POST /api/auth/register` `login` `logout` `refresh` `forgot-password` `reset-password`, `GET /api/auth/me` | JWT auth over httpOnly cookies |
| `POST /api/analyses` | multipart upload (`file`, `patient_context`) → `{analysis_id, status}`; analysis runs in background |
| `GET /api/analyses?limit=` | current user's list with `top_finding`, `lab_count`, `flagged_count` |
| `GET /api/analyses/{id}` | full report or `processing`/`failed` status |
| `GET /api/analyses/{id}/summary.pdf` | one-page reportlab PDF: summary, flagged values, questions, disclaimer (409 while processing) |
| `DELETE /api/analyses/{id}` | soft delete |
| `GET /api/analyses/{id}/file` | original upload from object storage |
| `POST /api/analyses/{id}/chat` | SSE stream of the grounded answer, persisted |
| `GET /api/analyses/{id}/messages` | chat history |

All `/api/analyses*` routes require auth and are scoped by `user_id` (other users get 404).

## Core requirements (static)
- Plain-language explanation, never a diagnosis; prominent "not medical advice" disclaimer everywhere
- Extract every lab value with reference range and normal/borderline/abnormal status
- Suggested questions for the patient's doctor
- Follow-up chat grounded strictly in the uploaded document

## Implemented
**2026-06 (session 1)**
- Full ClarifyMed MVP: uploader, async analysis pipeline, results page, grounded streaming chat, recent reports
- Renamed brand to ClarifyMed with new SVG logo mark + header (nav + "not medical advice" pill)
- My History page (`/history`) with dates, top finding per report, flagged-value counts, click-through to results
- Testing agent iteration 1: backend 9/9 pass, frontend end-to-end pass, 0 issues
- Fixture: `/app/tests/sample_lab_report.pdf` (generator: `make_sample_report.py`)

## Backlog
**P0**
- Delete-from-UI for a report (endpoint exists, no button)
- Email delivery for password reset (link is currently only logged to the backend log)

**P1**
- Multi-page / multi-file reports and trend comparison across dates ("your ferritin over time")
- Shareable read-only link for a clinician (in addition to the PDF download)
- Localisation of summaries (patient's preferred language)

**P2**
- Streaming the analysis (progressive summary) instead of poll-until-complete
- Stream analysis file to a temp path rather than holding bytes in memory (code review note)
- Persist LLM chat session server-side instead of stitching the last 10 messages
- Prune demo/test analyses from the seeded demo account periodically
