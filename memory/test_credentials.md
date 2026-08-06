# Test credentials — ClarifyMed

Auth: custom email/password JWT with httpOnly cookies (`access_token` 15 min, `refresh_token` 7 days).
See `/app/auth_testing.md` for the full auth testing playbook.

## Seeded demo account (from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `/app/backend/.env`)
| Email | Password | Role |
|---|---|---|
| `demo@clarifymed.app` (or your local `ADMIN_EMAIL`) | *(set via `ADMIN_PASSWORD` in your local, gitignored `.env` — never commit the real value)* | admin (used as the demo patient; owns the existing sample analyses) |

**Note:** an earlier revision of this file committed the real demo password to source control. If that password is still in use anywhere, rotate it — a value that has ever been in git history should be treated as compromised.

The login page has a **"Fill in the demo account"** button (`data-testid="use-demo-account-button"`)
that pre-fills these credentials.

## Creating a test patient
Register any new email via `/login` → "Create an account", or:
```
curl -c /tmp/c.txt -X POST $BASE/api/auth/register -H "Content-Type: application/json" \
  -d '{"email":"patient1@example.com","password":"Secret123!","name":"Test"}'
```
Password must be at least 8 characters. New accounts start with an empty history.

## Auth endpoints
`POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`,
`POST /api/auth/refresh`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`

## Other
- `EMERGENT_LLM_KEY` in `/app/backend/.env` (Emergent Universal Key) powers analysis, chat and object storage. No user keys needed.
- Upload fixture for tests: `/app/tests/sample_lab_report.pdf`
- All `/api/analyses*` routes require a valid cookie/bearer token and are scoped to the signed-in user.
