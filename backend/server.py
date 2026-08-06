import json
import logging
import os
import tempfile
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from fastapi import APIRouter, BackgroundTasks, FastAPI, File, Form, HTTPException, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient

from ai import analyse_document, build_followup_chat
from emergentintegrations.llm.chat import StreamDone, TextDelta, UserMessage
from models import Analysis, ChatMessage, ChatRequest, Report
from storage import APP_NAME, init_storage, put_object, get_object

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("medical-ai")

client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Medical AI Assistant")
api = APIRouter(prefix="/api")

ALLOWED_TYPES = {
    "application/pdf": "pdf",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp",
}
MAX_BYTES = 20 * 1024 * 1024


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


async def run_analysis(analysis_id: str, data: bytes, ext: str, mime_type: str, patient_context: str):
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
            tmp.write(data)
            tmp_path = tmp.name

        report, document_text = await analyse_document(
            session_id=f"analysis-{analysis_id}",
            file_path=tmp_path,
            mime_type=mime_type,
            patient_context=patient_context,
        )
        await db.analyses.update_one(
            {"analysis_id": analysis_id},
            {"$set": {
                "status": "complete",
                "report": report.model_dump(),
                "document_text": document_text,
                "error": "",
            }},
        )
        logger.info("Analysis %s complete", analysis_id)
    except Exception as exc:
        logger.exception("Analysis %s failed", analysis_id)
        await db.analyses.update_one(
            {"analysis_id": analysis_id},
            {"$set": {"status": "failed", "error": str(exc)[:400]}},
        )
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)


@api.get("/")
async def root():
    return {"service": "Medical AI Assistant", "status": "ok"}


@api.post("/analyses")
async def create_analysis(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    patient_context: str = Form(""),
):
    mime_type = (file.content_type or "").lower()
    if mime_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Please upload a PDF, PNG, JPG or WEBP file.")

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=400, detail="File is larger than 20 MB.")

    ext = ALLOWED_TYPES[mime_type]
    analysis_id = str(uuid.uuid4())
    storage_path = f"{APP_NAME}/uploads/{analysis_id}.{ext}"

    try:
        result = put_object(storage_path, data, mime_type)
        storage_path = result.get("path", storage_path)
    except Exception:
        logger.exception("Object storage upload failed for %s", analysis_id)
        storage_path = ""

    analysis = Analysis(
        analysis_id=analysis_id,
        filename=file.filename or f"report.{ext}",
        content_type=mime_type,
        storage_path=storage_path,
        size=len(data),
        patient_context=patient_context or "",
        status="processing",
        created_at=now_iso(),
    )
    await db.analyses.insert_one(analysis.to_mongo())

    background_tasks.add_task(run_analysis, analysis_id, data, ext, mime_type, patient_context or "")
    return {"analysis_id": analysis_id, "status": "processing"}


@api.get("/analyses")
async def list_analyses(limit: int = 12):
    docs = await db.analyses.find(
        {"is_deleted": False},
        {"document_text": 0},
    ).sort("created_at", -1).to_list(min(limit, 50))
    items = []
    for doc in docs:
        model = Analysis.from_mongo(doc)
        items.append({
            "analysis_id": model.analysis_id,
            "filename": model.filename,
            "status": model.status,
            "created_at": model.created_at,
            "document_type": model.report.document_type if model.report else "",
            "overall_status": model.report.overall_status if model.report else "",
            "headline": model.report.headline if model.report else "",
        })
    return {"items": items}


@api.get("/analyses/{analysis_id}")
async def get_analysis(analysis_id: str):
    doc = await db.analyses.find_one({"analysis_id": analysis_id, "is_deleted": False})
    if not doc:
        raise HTTPException(status_code=404, detail="Analysis not found")
    model = Analysis.from_mongo(doc)
    return {
        "analysis_id": model.analysis_id,
        "filename": model.filename,
        "content_type": model.content_type,
        "size": model.size,
        "patient_context": model.patient_context,
        "status": model.status,
        "error": model.error,
        "created_at": model.created_at,
        "has_file": bool(model.storage_path),
        "report": model.report.model_dump() if model.report else None,
    }


@api.delete("/analyses/{analysis_id}")
async def delete_analysis(analysis_id: str):
    result = await db.analyses.update_one(
        {"analysis_id": analysis_id}, {"$set": {"is_deleted": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return {"deleted": True}


@api.get("/analyses/{analysis_id}/file")
async def download_file(analysis_id: str):
    doc = await db.analyses.find_one({"analysis_id": analysis_id, "is_deleted": False})
    if not doc or not doc.get("storage_path"):
        raise HTTPException(status_code=404, detail="File not found")
    try:
        content, content_type = get_object(doc["storage_path"])
    except Exception:
        logger.exception("File download failed for %s", analysis_id)
        raise HTTPException(status_code=502, detail="Could not read the stored file")
    return Response(content=content, media_type=doc.get("content_type") or content_type)


@api.get("/analyses/{analysis_id}/messages")
async def list_messages(analysis_id: str):
    docs = await db.messages.find({"analysis_id": analysis_id}).sort("created_at", 1).to_list(500)
    return {"items": [
        {"role": d["role"], "content": d["content"], "created_at": d["created_at"]}
        for d in docs
    ]}


@api.post("/analyses/{analysis_id}/chat")
async def chat(analysis_id: str, payload: ChatRequest):
    doc = await db.analyses.find_one({"analysis_id": analysis_id, "is_deleted": False})
    if not doc:
        raise HTTPException(status_code=404, detail="Analysis not found")
    question = (payload.message or "").strip()
    if not question:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    model = Analysis.from_mongo(doc)
    await db.messages.insert_one(
        ChatMessage(analysis_id=analysis_id, role="user", content=question, created_at=now_iso()).to_mongo()
    )

    history = await db.messages.find({"analysis_id": analysis_id}).sort("created_at", 1).to_list(60)
    transcript = "\n".join(
        f"{'Patient' if m['role'] == 'user' else 'Assistant'}: {m['content']}"
        for m in history[:-1][-10:]
    )

    llm = build_followup_chat(
        session_id=f"chat-{analysis_id}-{uuid.uuid4().hex[:8]}",
        report=model.report,
        document_text=model.document_text,
    )
    prompt = (
        (f"Earlier conversation:\n{transcript}\n\n" if transcript else "")
        + f"Patient's question: {question}"
    )

    async def event_stream():
        collected: list[str] = []
        try:
            async for event in llm.stream_message(UserMessage(text=prompt)):
                if isinstance(event, TextDelta):
                    collected.append(event.content)
                    yield f"data: {json.dumps({'type': 'delta', 'content': event.content})}\n\n"
                elif isinstance(event, StreamDone):
                    break
        except Exception as exc:
            logger.exception("Chat stream failed for %s", analysis_id)
            yield f"data: {json.dumps({'type': 'error', 'content': str(exc)[:200]})}\n\n"
        answer = "".join(collected).strip()
        if answer:
            await db.messages.insert_one(
                ChatMessage(
                    analysis_id=analysis_id, role="assistant", content=answer, created_at=now_iso()
                ).to_mongo()
            )
        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"},
    )


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=(os.environ.get("CORS_ORIGINS") or "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    try:
        init_storage()
        logger.info("Object storage initialised")
    except Exception as exc:
        logger.error("Storage init failed: %s", exc)
    await db.analyses.create_index("analysis_id")
    await db.messages.create_index("analysis_id")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
