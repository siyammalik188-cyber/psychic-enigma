# Test credentials — ClarifyMed

Custom email/password JWT auth (httpOnly cookies) is now implemented.

## Demo (seeded) account
- **email**: `demo@clarifymed.app`
- **password**: `Clarify123!`
- Seeded on backend startup from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `/app/backend/.env`.
- Owns 5 pre-existing completed analyses.

## Notes
- Password min length: 8 chars. Duplicate email register → 400. Wrong password → 401.
- 5 failed logins per ip+email → 429 lockout for 15 min. Use throwaway emails for lockout tests.
- Base URL: value of `REACT_APP_BACKEND_URL` in `/app/frontend/.env`.
- Upload fixture: `/app/tests/sample_lab_report.pdf`.
- `EMERGENT_LLM_KEY` in `/app/backend/.env` powers the analysis + follow-up chat.
