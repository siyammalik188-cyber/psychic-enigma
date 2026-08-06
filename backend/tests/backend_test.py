"""Backend tests for ClarifyMed Medical AI Assistant."""
import json
import os
import time
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL", "")).rstrip("/")
assert BASE_URL, "REACT_APP_BACKEND_URL missing"

API = f"{BASE_URL}/api"
SAMPLE_PDF = "/app/tests/sample_lab_report.pdf"

POLL_TIMEOUT = 150  # seconds
POLL_INTERVAL = 3


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    return s


@pytest.fixture(scope="session")
def analysis_id(client):
    """Create one analysis and poll until complete; reused across tests."""
    assert Path(SAMPLE_PDF).exists(), f"Missing fixture {SAMPLE_PDF}"
    with open(SAMPLE_PDF, "rb") as f:
        files = {"file": ("sample_lab_report.pdf", f, "application/pdf")}
        data = {"patient_context": "TEST_ 42yo, feeling fatigued"}
        r = client.post(f"{API}/analyses", files=files, data=data, timeout=60)
    assert r.status_code == 200, f"Create failed: {r.status_code} {r.text[:400]}"
    body = r.json()
    assert body.get("status") == "processing"
    assert body.get("analysis_id")
    aid = body["analysis_id"]

    # Poll
    start = time.time()
    while time.time() - start < POLL_TIMEOUT:
        gr = client.get(f"{API}/analyses/{aid}", timeout=30)
        assert gr.status_code == 200
        st = gr.json().get("status")
        if st == "complete":
            return aid
        if st == "failed":
            pytest.fail(f"Analysis failed: {gr.json().get('error')}")
        time.sleep(POLL_INTERVAL)
    pytest.fail(f"Analysis did not complete within {POLL_TIMEOUT}s")


# === Health ===
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# === Validation ===
class TestValidation:
    def test_reject_text_file(self, client, tmp_path):
        p = tmp_path / "hi.txt"
        p.write_text("not a pdf")
        with open(p, "rb") as f:
            r = client.post(
                f"{API}/analyses",
                files={"file": ("hi.txt", f, "text/plain")},
                timeout=30,
            )
        assert r.status_code == 400
        assert "detail" in r.json()

    def test_404_random_uuid(self, client):
        rid = str(uuid.uuid4())
        r = client.get(f"{API}/analyses/{rid}", timeout=15)
        assert r.status_code == 404

    def test_empty_chat_message(self, client, analysis_id):
        r = client.post(
            f"{API}/analyses/{analysis_id}/chat",
            json={"message": "   "},
            timeout=15,
        )
        assert r.status_code == 400

    def test_chat_on_unknown_analysis(self, client):
        r = client.post(
            f"{API}/analyses/{uuid.uuid4()}/chat",
            json={"message": "hi"},
            timeout=15,
        )
        assert r.status_code == 404


# === Analysis result shape ===
class TestAnalysisResult:
    def test_report_shape(self, client, analysis_id):
        r = client.get(f"{API}/analyses/{analysis_id}", timeout=30)
        assert r.status_code == 200
        body = r.json()
        assert body["analysis_id"] == analysis_id
        assert body["status"] == "complete"
        assert body["has_file"] is True
        report = body["report"]
        assert report is not None
        for key in [
            "document_type", "overall_status", "headline", "patient_summary",
            "key_findings", "lab_values", "questions_for_doctor", "next_steps", "red_flags",
        ]:
            assert key in report, f"missing {key}"
        assert isinstance(report["lab_values"], list)
        assert len(report["lab_values"]) >= 1, "expected at least one lab value"
        lv = report["lab_values"][0]
        for k in ["name", "value", "unit", "reference_range", "status"]:
            assert k in lv
        assert report["overall_status"] in {"normal", "attention", "urgent"}
        assert isinstance(report["questions_for_doctor"], list)

    def test_list_analyses(self, client, analysis_id):
        r = client.get(f"{API}/analyses", timeout=30)
        assert r.status_code == 200
        items = r.json().get("items", [])
        assert isinstance(items, list) and len(items) >= 1
        ids = [i["analysis_id"] for i in items]
        assert analysis_id in ids
        target = next(i for i in items if i["analysis_id"] == analysis_id)
        for k in ["analysis_id", "filename", "status", "created_at",
                  "document_type", "overall_status", "headline"]:
            assert k in target

    def test_download_file(self, client, analysis_id):
        r = client.get(f"{API}/analyses/{analysis_id}/file", timeout=60)
        assert r.status_code == 200
        assert r.content.startswith(b"%PDF")
        assert len(r.content) > 100


# === Chat SSE + persistence ===
class TestChat:
    def test_chat_stream_and_persistence(self, client, analysis_id):
        # Ensure clean baseline count
        r0 = client.get(f"{API}/analyses/{analysis_id}/messages", timeout=15)
        assert r0.status_code == 200
        before = len(r0.json().get("items", []))

        question = "TEST_ What does my hemoglobin value mean in plain language?"
        with client.post(
            f"{API}/analyses/{analysis_id}/chat",
            json={"message": question},
            stream=True,
            timeout=120,
        ) as resp:
            assert resp.status_code == 200
            assert "text/event-stream" in resp.headers.get("content-type", "")
            deltas = []
            saw_done = False
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
            assert saw_done, "SSE never emitted done"
            answer = "".join(deltas).strip()
            assert len(answer) > 10, f"empty/tiny answer: {answer!r}"

        # Persistence
        r1 = client.get(f"{API}/analyses/{analysis_id}/messages", timeout=15)
        assert r1.status_code == 200
        msgs = r1.json().get("items", [])
        assert len(msgs) == before + 2, f"expected +2 msgs, got {len(msgs)-before}"
        assert msgs[-2]["role"] == "user"
        assert msgs[-2]["content"] == question
        assert msgs[-1]["role"] == "assistant"
        assert len(msgs[-1]["content"]) > 10
