from typing import Annotated, Any, List, Optional

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True)
        data.pop("_id", None)
        return data

    @classmethod
    def from_mongo(cls, doc: Optional[dict]):
        if not doc:
            return None
        return cls.model_validate(doc)


class LabValue(BaseModel):
    name: str
    value: str = ""
    unit: str = ""
    reference_range: str = ""
    status: str = "unknown"
    plain_meaning: str = ""


class Finding(BaseModel):
    title: str
    explanation: str = ""
    status: str = "normal"
    importance: str = "medium"


class Report(BaseModel):
    document_type: str = "Medical report"
    overall_status: str = "normal"
    headline: str = ""
    patient_summary: str = ""
    key_findings: List[Finding] = Field(default_factory=list)
    lab_values: List[LabValue] = Field(default_factory=list)
    questions_for_doctor: List[str] = Field(default_factory=list)
    next_steps: List[str] = Field(default_factory=list)
    red_flags: List[str] = Field(default_factory=list)


class Analysis(BaseDocument):
    analysis_id: str
    filename: str
    content_type: str = "application/pdf"
    storage_path: str = ""
    size: int = 0
    patient_context: str = ""
    status: str = "processing"
    error: str = ""
    document_text: str = ""
    report: Optional[Report] = None
    created_at: str
    is_deleted: bool = False


class ChatMessage(BaseDocument):
    analysis_id: str
    role: str
    content: str
    created_at: str


class ChatRequest(BaseModel):
    message: str
