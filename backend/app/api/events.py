from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import json

from app.core.database import get_db
from app.models.domain import Event, Report, EventReport, Source
from app.schemas.domain import EventSchema, ReportSchema

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("", response_model=List[EventSchema])
def get_events(
    event_type: Optional[str] = None,
    severity: Optional[str] = None,
    state: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Event)

    if event_type and event_type != "All":
        query = query.filter(Event.event_type == event_type)
    if severity and severity != "All":
        query = query.filter(Event.severity == severity)
    if state and state != "All":
        query = query.filter(Event.state == state)
    if status and status != "All":
        query = query.filter(Event.status == status)

    events = query.order_by(Event.last_updated.desc()).all()
    result = []
    for ev in events:
        reps = ev.reports
        unique_sources = len(set([r.source_id for r in reps]))
        verified_count = len([r for r in reps if r.verification_status == "Verified"])
        suspicious_count = len([r for r in reps if r.verification_status == "Suspicious"])

        result.append(EventSchema(
            id=ev.id,
            title=ev.title,
            event_type=ev.event_type,
            severity=ev.severity,
            latitude=ev.latitude,
            longitude=ev.longitude,
            city=ev.city,
            state=ev.state,
            confidence=ev.confidence,
            status=ev.status,
            first_detected=ev.first_detected,
            last_updated=ev.last_updated,
            report_count=len(reps),
            unique_source_count=unique_sources,
            verified_report_count=verified_count,
            suspicious_report_count=suspicious_count,
            formation_steps_json=ev.formation_steps_json
        ))
    return result

@router.get("/{event_id}", response_model=dict)
def get_event_detail(event_id: str, db: Session = Depends(get_db)):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")

    reps = ev.reports
    unique_sources = len(set([r.source_id for r in reps]))
    verified_count = len([r for r in reps if r.verification_status == "Verified"])
    suspicious_count = len([r for r in reps if r.verification_status == "Suspicious"])
    duplicate_count = len([r for r in reps if r.is_duplicate])

    report_list = []
    for r in reps:
        src = db.query(Source).filter(Source.id == r.source_id).first()
        report_list.append(ReportSchema(
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

    event_summary = EventSchema(
        id=ev.id,
        title=ev.title,
        event_type=ev.event_type,
        severity=ev.severity,
        latitude=ev.latitude,
        longitude=ev.longitude,
        city=ev.city,
        state=ev.state,
        confidence=ev.confidence,
        status=ev.status,
        first_detected=ev.first_detected,
        last_updated=ev.last_updated,
        report_count=len(reps),
        unique_source_count=unique_sources,
        verified_report_count=verified_count,
        suspicious_report_count=suspicious_count,
        formation_steps_json=ev.formation_steps_json
    )

    # Affected sub-locations
    affected_locations = list(set([f"{r.content.split('.')[0][:30]}..." for r in reps]))

    return {
        "event": event_summary,
        "reports": report_list,
        "duplicate_count": duplicate_count,
        "affected_locations": affected_locations,
        "formation_steps": json.loads(ev.formation_steps_json) if ev.formation_steps_json else []
    }

@router.post("/{event_id}/close")
def close_event(event_id: str, db: Session = Depends(get_db)):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")
    
    ev.status = "Resolved"
    ev.last_updated = datetime.utcnow()
    db.commit()
    return {"message": "Event status updated to Resolved", "status": "Resolved"}

@router.post("/{event_id}/merge")
def merge_event(event_id: str, target_event_id: str = Query(...), db: Session = Depends(get_db)):
    ev_source = db.query(Event).filter(Event.id == event_id).first()
    ev_target = db.query(Event).filter(Event.id == target_event_id).first()
    
    if not ev_source or not ev_target:
        raise HTTPException(status_code=404, detail="One or both events not found")

    # Move reports
    links = db.query(EventReport).filter(EventReport.event_id == event_id).all()
    for link in links:
        existing_target_link = db.query(EventReport).filter(
            EventReport.event_id == target_event_id,
            EventReport.report_id == link.report_id
        ).first()
        if not existing_target_link:
            new_link = EventReport(event_id=target_event_id, report_id=link.report_id)
            db.add(new_link)
        db.delete(link)

    ev_source.status = "Resolved"
    ev_target.last_updated = datetime.utcnow()
    db.commit()
    return {"message": f"Merged {event_id} into {target_event_id}"}
