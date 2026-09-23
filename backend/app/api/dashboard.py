from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.domain import Report, Event, Source
from app.schemas.domain import DashboardSummarySchema, ReportSchema
import json

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary", response_model=DashboardSummarySchema)
def get_dashboard_summary(db: Session = Depends(get_db)):
    active_events = db.query(Event).filter(Event.status == "Active").count()
    total_reports = db.query(Report).count()
    verified_reports = db.query(Report).filter(Report.verification_status == "Verified").count()
    suspicious_reports = db.query(Report).filter(Report.verification_status == "Suspicious").count()
    duplicates_detected = db.query(Report).filter(Report.is_duplicate == True).count()

    # Event category distribution
    categories = ["Heavy Rain", "Flooding", "Thunderstorm", "Heatwave", "Fog", "Dust Storm", "Strong Wind"]
    event_distribution = {}
    for cat in categories:
        count = db.query(Report).filter(Report.event_type == cat).count()
        event_distribution[cat] = count

    # Recent 10 reports
    recent_reps_query = db.query(Report).order_by(Report.timestamp.desc()).limit(10).all()
    recent_reports = []
    for r in recent_reps_query:
        src = db.query(Source).filter(Source.id == r.source_id).first()
        recent_reports.append(ReportSchema(
            id=r.id,
            source_id=r.source_id,
            timestamp=r.timestamp,
            content=r.content,
            latitude=r.latitude,
            longitude=r.longitude,
            city=r.city,
            state=r.state,
            event_type=r.event_type,
            media_url=r.media_url,
            verification_status=r.verification_status,
            reliability_score=r.reliability_score,
            duplicate_score=r.duplicate_score,
            is_duplicate=r.is_duplicate,
            reasons_json=r.reasons_json,
            created_at=r.created_at,
            source_name=src.name if src else r.source_id
        ))

    system_status = {
        "INGESTION": "Operational",
        "AI_PROCESSING": "Operational",
        "EVENT_FUSION": "Operational",
        "DATABASE": "Healthy",
        "MAP_SERVICE": "Operational"
    }

    return DashboardSummarySchema(
        active_events=active_events,
        reports_processed=total_reports,
        verified_reports=verified_reports,
        suspicious_reports=suspicious_reports,
        duplicates_detected=duplicates_detected,
        event_distribution=event_distribution,
        recent_reports=recent_reports,
        system_status=system_status
    )
