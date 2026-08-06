# ClarifyMed — Auth testing playbook

Custom email/password JWT auth (httpOnly cookies) on FastAPI + MongoDB + React.

## Accounts
- Seeded demo account: `demo@clarifymed.app` / `Clarify123!` (from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `/app/backend/.env`)
- Register any new email to create a fresh patient account (password min 8 chars)

## Step 1: MongoDB verification
```
mongosh
use medical_ai
db.users.find().pretty()
db.users.findOne({email: "demo@clarifymed.app"}, {password_hash: 1})
db.users.getIndexes()
db.login_attempts.getIndexes()
db.password_reset_tokens.getIndexes()
```
Verify: `password_hash` starts with `$2b$`; unique index on `users.email`; index on
`login_attempts.identifier`; TTL index on `password_reset_tokens.expires_at`.

## Step 2: API testing (cookies)
```
BASE=https://53cd976d-dd01-4ba3-8e9f-a7ae7088dc50.preview.emergentagent.com
curl -c /tmp/c.txt -X POST $BASE/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"demo@clarifymed.app","password":"Clarify123!"}'
cat /tmp/c.txt          # expect access_token + refresh_token
curl -b /tmp/c.txt $BASE/api/auth/me
curl -b /tmp/c.txt $BASE/api/auth/refresh -X POST
curl -b /tmp/c.txt -X POST $BASE/api/auth/logout
```

## Endpoints
| Method | Path |
|---|---|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| POST | `/api/auth/logout` |
| GET  | `/api/auth/me` |
| POST | `/api/auth/refresh` |
| POST | `/api/auth/forgot-password` (reset link is logged to the backend log) |
| POST | `/api/auth/reset-password` |

## Expected behaviour
- All `/api/analyses*` routes return **401** without a cookie/bearer token.
- Analyses are scoped by `user_id`: user B requesting user A's `analysis_id` gets **404**.
- 5 failed logins for the same ip+email → **429** for 15 minutes.
- Wrong password → **401** "Incorrect email or password."; duplicate register → **400**.
- Access token lives 15 min; refresh token 7 days.
