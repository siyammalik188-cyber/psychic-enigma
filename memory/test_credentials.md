# Test credentials — ClarifyMed

**No authentication is implemented.** The app is open: no login, signup, or seeded accounts.
Every visitor sees the same shared report history.

- Backend/base URL: value of `REACT_APP_BACKEND_URL` in `/app/frontend/.env`
- API keys: `EMERGENT_LLM_KEY` in `/app/backend/.env` (Emergent Universal Key) — powers both the
  report analysis and the follow-up chat, plus object storage. No user-supplied keys needed.
- Upload fixture for tests: `/app/tests/sample_lab_report.pdf`
