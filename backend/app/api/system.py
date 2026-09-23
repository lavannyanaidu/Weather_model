from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.domain import VerificationAction
from app.schemas.domain import ActionLogSchema

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/status")
def get_system_status():
    return {
        "status": "Healthy",
        "services": {
            "INGESTION": {"status": "ONLINE", "latency_ms": 12},
            "AI_PROCESSING": {"status": "ONLINE", "latency_ms": 34},
            "EVENT_FUSION": {"status": "ONLINE", "latency_ms": 18},
            "DATABASE": {"status": "HEALTHY", "latency_ms": 4},
            "MAP_SERVICE": {"status": "ONLINE", "latency_ms": 8}
        },
        "version": "1.0.0-prototype",
        "environment": "MoES Intelligence Production-Demo"
    }

@router.get("/audit-logs", response_model=List[ActionLogSchema])
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.query(VerificationAction).order_by(VerificationAction.timestamp.desc()).limit(20).all()
    return [ActionLogSchema.from_orm(l) for l in logs]
