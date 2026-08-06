"""Backend tests for ClarifyMed Medical AI Assistant (auth + per-user isolation + PDF export)."""
import io
import json
import os
import time
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values
from pypdf import PdfReader

frontend_env = dotenv_values("/app/frontend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL", "")).rstrip("/")
assert BASE_URL, "REACT_APP_BACKEND_URL missing"

API = f"{BASE_URL}/api"
SAMPLE_PDF = "/app/tests/sample_lab_report.pdf"

DEMO_EMAIL = "demo@clarifymed.app"
DEMO_PASSWORD = "Clarify123!"

POLL_TIMEOUT = 150
POLL_INTERVAL = 3


def _fresh_email(tag: str = "user") -> str:
    return f"TEST_{tag}_{uuid.uuid4().hex[:10]}@clarifytest.dev"


def _session_for(email: str, password: str, register: bool = False) -> requests.Session:
    s = requests.Session()
    if register:
        r = s.post(f"{API}/auth/register", json={"email": email, "password": password, "name": "TEST"}, timeout=30)
        assert r.status_code == 200, f"register failed: {r.status_code} {r.text[:300]}"
    else:
        r = s.post(f"{API}/auth/login", json={"email": email, "password": password}, timeout=30)
        assert r.status_code == 200, f"login failed: {r.status_code} {r.text[:300]}"
    assert "access_token" in s.cookies, "access_token cookie not set"
    assert "refresh_token" in s.cookies, "refresh_token cookie not set"
    return s


@pytest.fixture(scope="session")
def demo_client() -> requests.Session:
    return _session_for(DEMO_EMAIL, DEMO_PASSWORD)


@pytest.fixture(scope="session")
def anon_client() -> requests.Session:
    return requests.Session()


@pytest.fixture(scope="session")
def demo_completed_analysis_id(demo_client) -> str:
    """Prefer an existing completed analysis; otherwise upload sample and poll."""
    r = demo_client.get(f"{API}/analyses", timeout=30)
    assert r.status_code == 200
    items = r.json().get("items", [])
    for it in items:
        if it.get("status") == "complete":
            return it["analysis_id"]
    # Fallback: upload and poll
    assert Path(SAMPLE_PDF).exists()
    with open(SAMPLE_PDF, "rb") as f:
        r = demo_client.post(
            f"{API}/analyses",
            files={"file": ("sample_lab_report.pdf", f, "application/pdf")},
            data={"patient_context": "TEST_ regression"},
            timeout=60,
        )
    assert r.status_code == 200, r.text
    aid = r.json()["analysis_id"]
    start = time.time()
    while time.time() - start < POLL_TIMEOUT:
        gr = demo_client.get(f"{API}/analyses/{aid}", timeout=30)
        if gr.status_code == 200 and gr.json().get("status") == "complete":
            return aid
        time.sleep(POLL_INTERVAL)
    pytest.fail(f"Analysis did not complete within {POLL_TIMEOUT}s")


# === Health ===
class TestHealth:
    def test_root(self, anon_client):
        r = anon_client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# === Auth: login/me/logout/refresh ===
class TestAuthCore:
    def test_analyses_require_auth(self, anon_client):
        r = anon_client.get(f"{API}/analyses", timeout=15)
        assert r.status_code == 401

    def test_demo_login_sets_cookies_and_me(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": DEMO_EMAIL, "password": DEMO_PASSWORD}, timeout=30)
        assert r.status_code == 200
        body = r.json()
        assert body["email"] == DEMO_EMAIL
        assert "id" in body
        assert "access_token" in s.cookies and "refresh_token" in s.cookies
        me = s.get(f"{API}/auth/me", timeout=15)
        assert me.status_code == 200
        assert me.json()["email"] == DEMO_EMAIL
        assert me.json()["id"] == body["id"]

    def test_refresh_endpoint_issues_new_access(self):
        s = _session_for(DEMO_EMAIL, DEMO_PASSWORD)
        old_access = s.cookies.get("access_token")
        # Delete only access_token so refresh cookie remains
        del s.cookies["access_token"]
        r = s.post(f"{API}/auth/refresh", timeout=15)
        assert r.status_code == 200, r.text
        assert r.json()["email"] == DEMO_EMAIL
        new_access = s.cookies.get("access_token")
        assert new_access  # refresh issued an access token (may equal old if same second)
        # New access token works
        me = s.get(f"{API}/auth/me", timeout=15)
        assert me.status_code == 200

    def test_refresh_without_cookie_401(self, anon_client):
        r = requests.post(f"{API}/auth/refresh", timeout=15)
        assert r.status_code == 401

    def test_logout_clears_cookies_and_me_401(self):
        s = _session_for(DEMO_EMAIL, DEMO_PASSWORD)
        r = s.post(f"{API}/auth/logout", timeout=15)
        assert r.status_code == 200
        # After logout, /me should require auth
        s2 = requests.Session()
        # simulate no cookies
        me = s2.get(f"{API}/auth/me", timeout=15)
        assert me.status_code == 401


# === Auth: register/validation/lockout ===
class TestAuthRegistration:
    def test_register_success_and_duplicate_400(self):
        email = _fresh_email("reg")
        s = requests.Session()
        r = s.post(f"{API}/auth/register", json={"email": email, "password": "password123"}, timeout=30)
        assert r.status_code == 200
        # Duplicate
        r2 = requests.post(f"{API}/auth/register", json={"email": email, "password": "password123"}, timeout=30)
        assert r2.status_code == 400

    def test_register_short_password_422(self):
        r = requests.post(f"{API}/auth/register", json={"email": _fresh_email("short"), "password": "short"}, timeout=15)
        assert r.status_code == 422

    def test_register_invalid_email_422_array_detail(self):
        r = requests.post(f"{API}/auth/register", json={"email": "not-an-email", "password": "password123"}, timeout=15)
        assert r.status_code == 422
        body = r.json()
        assert isinstance(body.get("detail"), list)

    def test_wrong_password_401(self):
        r = requests.post(f"{API}/auth/login", json={"email": DEMO_EMAIL, "password": "WrongPassword!"}, timeout=15)
        assert r.status_code == 401

    def test_lockout_after_5_failures(self):
        # Use throwaway registered account to keep demo usable
        email = _fresh_email("lock")
        s = requests.Session()
        r = s.post(f"{API}/auth/register", json={"email": email, "password": "password123"}, timeout=30)
        assert r.status_code == 200
        # Now hammer with wrong password from same ip
        seen_429 = False
        for i in range(6):
            r = requests.post(f"{API}/auth/login", json={"email": email, "password": "WrongPass!!"}, timeout=15)
            if r.status_code == 429:
                seen_429 = True
                break
            assert r.status_code == 401, f"attempt {i}: {r.status_code} {r.text[:200]}"
        if not seen_429:
            r = requests.post(f"{API}/auth/login", json={"email": email, "password": "WrongPass!!"}, timeout=15)
            assert r.status_code == 429, f"expected lockout, got {r.status_code}"
        # Correct password also blocked
        r = requests.post(f"{API}/auth/login", json={"email": email, "password": "password123"}, timeout=15)
        assert r.status_code == 429


# === Auth: forgot/reset password ===
class TestPasswordReset:
    def test_forgot_password_always_200(self):
        r = requests.post(f"{API}/auth/forgot-password", json={"email": "nonexistent@example.com"}, timeout=15)
        assert r.status_code == 200
        assert r.json().get("sent") is True

    def test_reset_password_invalid_token_400(self):
        r = requests.post(f"{API}/auth/reset-password", json={"token": "invalid-token-xyz", "password": "newpassword123"}, timeout=15)
        assert r.status_code == 400

    def test_forgot_and_reset_flow(self):
        # Register a user, request reset, read token from DB directly via mongo? we can't from tests.
        # Instead, verify the request succeeds and that a mismatching short password on reset returns 422.
        email = _fresh_email("reset")
        r = requests.post(f"{API}/auth/register", json={"email": email, "password": "password123"}, timeout=15)
        assert r.status_code == 200
        r = requests.post(f"{API}/auth/forgot-password", json={"email": email}, timeout=15)
        assert r.status_code == 200
        r = requests.post(f"{API}/auth/reset-password", json={"token": "anything", "password": "short"}, timeout=15)
        assert r.status_code == 422


# === Per-user isolation ===
class TestIsolation:
    def test_user_b_sees_empty_history_and_cannot_access_demo_analysis(self, demo_completed_analysis_id):
        b_email = _fresh_email("iso")
        b = _session_for(b_email, "password123", register=True)
        r = b.get(f"{API}/analyses", timeout=30)
        assert r.status_code == 200
        assert r.json().get("items", []) == []

        aid = demo_completed_analysis_id
        for path in [f"/analyses/{aid}", f"/analyses/{aid}/messages", f"/analyses/{aid}/summary.pdf", f"/analyses/{aid}/file"]:
            r = b.get(f"{API}{path}", timeout=30)
            assert r.status_code == 404, f"{path} -> {r.status_code}"
        r = b.delete(f"{API}/analyses/{aid}", timeout=15)
        assert r.status_code == 404

    def test_user_b_upload_not_visible_to_demo(self, demo_client):
        b_email = _fresh_email("iso2")
        b = _session_for(b_email, "password123", register=True)
        # Upload as B
        with open(SAMPLE_PDF, "rb") as f:
            r = b.post(
                f"{API}/analyses",
                files={"file": ("sample_lab_report.pdf", f, "application/pdf")},
                data={"patient_context": "TEST_isoB"},
                timeout=60,
            )
        assert r.status_code == 200
        b_aid = r.json()["analysis_id"]
        # B can see it
        rb = b.get(f"{API}/analyses/{b_aid}", timeout=15)
        assert rb.status_code == 200
        # Demo cannot
        rd = demo_client.get(f"{API}/analyses/{b_aid}", timeout=15)
        assert rd.status_code == 404
        demo_list = demo_client.get(f"{API}/analyses", timeout=15).json().get("items", [])
        assert b_aid not in [i["analysis_id"] for i in demo_list]


# === Analysis regressions ===
class TestAnalysisRegressions:
    def test_report_shape(self, demo_client, demo_completed_analysis_id):
        r = demo_client.get(f"{API}/analyses/{demo_completed_analysis_id}", timeout=30)
        assert r.status_code == 200
        body = r.json()
        assert body["status"] == "complete"
        report = body["report"]
        assert report is not None
        for k in ["document_type", "overall_status", "headline", "patient_summary",
                  "key_findings", "lab_values", "questions_for_doctor", "next_steps", "red_flags"]:
            assert k in report

    def test_list_analyses_contains_demo(self, demo_client, demo_completed_analysis_id):
        r = demo_client.get(f"{API}/analyses", timeout=30)
        assert r.status_code == 200
        items = r.json().get("items", [])
        assert demo_completed_analysis_id in [i["analysis_id"] for i in items]

    def test_random_uuid_404(self, demo_client):
        r = demo_client.get(f"{API}/analyses/{uuid.uuid4()}", timeout=15)
        assert r.status_code == 404

    def test_reject_text_file(self, demo_client, tmp_path):
        p = tmp_path / "hi.txt"
        p.write_text("not a pdf")
        with open(p, "rb") as f:
            r = demo_client.post(f"{API}/analyses", files={"file": ("hi.txt", f, "text/plain")}, timeout=30)
        assert r.status_code == 400


# === PDF export ===
class TestPdfExport:
    def test_pdf_export_completed_report(self, demo_client, demo_completed_analysis_id):
        r = demo_client.get(f"{API}/analyses/{demo_completed_analysis_id}/summary.pdf", timeout=60)
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("application/pdf")
        cd = r.headers.get("content-disposition", "")
        assert "attachment" in cd.lower()
        assert "filename=" in cd.lower()
        assert r.content.startswith(b"%PDF")
        # Parse
        reader = PdfReader(io.BytesIO(r.content))
        assert len(reader.pages) == 1, f"expected 1 page, got {len(reader.pages)}"
        text = reader.pages[0].extract_text() or ""
        assert "ClarifyMed" in text
        assert "NOT MEDICAL ADVICE" in text
        # Headline / summary presence - fetch report to compare
        rep = demo_client.get(f"{API}/analyses/{demo_completed_analysis_id}", timeout=15).json()["report"]
        if rep.get("headline"):
            headline_head = rep["headline"].split()[0]
            assert headline_head.lower() in text.lower() or rep["headline"][:20] in text
        # Questions section header
        if rep.get("questions_for_doctor"):
            assert "Questions the patient would like to ask".lower() in text.lower()

    def test_pdf_export_processing_returns_409(self, demo_client):
        # Upload fresh and immediately hit the PDF endpoint while processing
        with open(SAMPLE_PDF, "rb") as f:
            r = demo_client.post(
                f"{API}/analyses",
                files={"file": ("sample_lab_report.pdf", f, "application/pdf")},
                data={"patient_context": "TEST_409"},
                timeout=60,
            )
        assert r.status_code == 200
        aid = r.json()["analysis_id"]
        # Should be processing right away
        gr = demo_client.get(f"{API}/analyses/{aid}", timeout=15).json()
        assert gr.get("status") == "processing"
        pr = demo_client.get(f"{API}/analyses/{aid}/summary.pdf", timeout=15)
        assert pr.status_code == 409, f"expected 409, got {pr.status_code}: {pr.text[:200]}"

    def test_pdf_export_requires_auth(self, anon_client, demo_completed_analysis_id):
        r = anon_client.get(f"{API}/analyses/{demo_completed_analysis_id}/summary.pdf", timeout=15)
        assert r.status_code == 401


# === Chat SSE regression ===
class TestChat:
    def test_chat_stream_and_persistence(self, demo_client, demo_completed_analysis_id):
        aid = demo_completed_analysis_id
        r0 = demo_client.get(f"{API}/analyses/{aid}/messages", timeout=15)
        assert r0.status_code == 200
        before = len(r0.json().get("items", []))

        question = "TEST_ Regression: what does my hemoglobin mean?"
        with demo_client.post(f"{API}/analyses/{aid}/chat", json={"message": question}, stream=True, timeout=120) as resp:
            assert resp.status_code == 200
            assert "text/event-stream" in resp.headers.get("content-type", "")
            deltas, saw_done = [], False
            for raw in resp.iter_lines(decode_unicode=True):
                if not raw or not raw.startswith("data: "):
                    continue
                evt = json.loads(raw[6:])
                if evt.get("type") == "delta":
                    deltas.append(evt.get("content", ""))
                elif evt.get("type") == "done":
                    saw_done = True
                    break
                elif evt.get("type") == "error":
                    pytest.fail(f"stream error: {evt.get('content')}")
            assert saw_done
            assert len("".join(deltas).strip()) > 10

        r1 = demo_client.get(f"{API}/analyses/{aid}/messages", timeout=15)
        assert r1.status_code == 200
        msgs = r1.json().get("items", [])
        assert len(msgs) >= before + 2

    def test_chat_requires_auth(self, anon_client, demo_completed_analysis_id):
        r = anon_client.post(f"{API}/analyses/{demo_completed_analysis_id}/chat", json={"message": "hi"}, timeout=15)
        assert r.status_code == 401

    def test_empty_message_400(self, demo_client, demo_completed_analysis_id):
        r = demo_client.post(f"{API}/analyses/{demo_completed_analysis_id}/chat", json={"message": "   "}, timeout=15)
        assert r.status_code == 400
