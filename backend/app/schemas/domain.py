from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SourceSchema(BaseModel):
    id: str
    name: str
    type: str
    status: str
    last_ingestion: datetime
    records_ingested: int
    error_count: int

    class Config:
        from_attributes = True

class ReportSchema(BaseModel):
    id: str
    source_id: str
    timestamp: datetime
    content: str
    latitude: float
    longitude: float
    city: str
    state: str
    event_type: str
    media_url: Optional[str] = None
    verification_status: str
    reliability_score: float
    duplicate_score: float
    is_duplicate: bool
    reasons_json: Optional[str] = None
    created_at: datetime
    source_name: Optional[str] = None

    class Config:
        from_attributes = True

class ReportCreateSchema(BaseModel):
    source_id: str
    content: str
    city: Optional[str] = None
    state: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    media_url: Optional[str] = None
    timestamp: Optional[datetime] = None

class EventSchema(BaseModel):
    id: str
    title: str
    event_type: str
    severity: str
    latitude: float
    longitude: float
    city: str
    state: str
    confidence: float
    status: str
    first_detected: datetime
    last_updated: datetime
    report_count: int = 0
    unique_source_count: int = 0
    verified_report_count: int = 0
    suspicious_report_count: int = 0
    formation_steps_json: Optional[str] = None

    class Config:
        from_attributes = True

class EventDetailSchema(EventSchema):
    reports: List[ReportSchema] = []

class DashboardSummarySchema(BaseModel):
    active_events: int
    reports_processed: int
    verified_reports: int
    suspicious_reports: int
    duplicates_detected: int
    event_distribution: dict
    recent_reports: List[ReportSchema]
    system_status: dict

class ActionLogSchema(BaseModel):
    id: int
    report_id: str
    action: str
    actor: str
    timestamp: datetime
    notes: Optional[str] = None

    class Config:
        from_attributes = True
