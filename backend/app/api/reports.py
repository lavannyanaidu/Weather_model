from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import random
import json

from app.core.database import get_db
from app.models.domain import Report, Source, VerificationAction, Event, EventReport
from app.schemas.domain import ReportSchema, ReportCreateSchema
from app.services.ingestion import process_incoming_report
from app.core.websocket_manager import manager

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("", response_model=List[ReportSchema])
def get_reports(
    search: Optional[str] = None,
    event_type: Optional[str] = None,
    state: Optional[str] = None,
    city: Optional[str] = None,
    verification_status: Optional[str] = None,
    source_id: Optional[str] = None,
    is_duplicate: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Report)

    if search:
        query = query.filter(Report.content.ilike(f"%{search}%") | Report.city.ilike(f"%{search}%"))
    if event_type and event_type != "All":
        query = query.filter(Report.event_type == event_type)
    if state and state != "All":
        query = query.filter(Report.state == state)
    if city and city != "All":
        query = query.filter(Report.city == city)
    if verification_status and verification_status != "All":
        query = query.filter(Report.verification_status == verification_status)
    if source_id and source_id != "All":
        query = query.filter(Report.source_id == source_id)
    if is_duplicate is not None:
        query = query.filter(Report.is_duplicate == is_duplicate)

    reports = query.order_by(Report.timestamp.desc()).all()
    result = []
    for r in reports:
        src = db.query(Source).filter(Source.id == r.source_id).first()
        result.append(ReportSchema(
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
    return result

@router.get("/{report_id}", response_model=dict)
def get_report_detail(report_id: str, db: Session = Depends(get_db)):
    r = db.query(Report).filter(Report.id == report_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Report not found")

    src = db.query(Source).filter(Source.id == r.source_id).first()
    
    # Supporting nearby reports
    nearby = db.query(Report).filter(
        Report.city == r.city,
        Report.id != r.id,
        Report.verification_status == "Verified"
    ).limit(5).all()

    supporting_reps = [
        {
            "id": nr.id,
            "content": nr.content,
            "timestamp": nr.timestamp.isoformat(),
            "reliability_score": nr.reliability_score
        }
        for nr in nearby
    ]

    return {
        "report": ReportSchema(
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
        ),
        "source": {
            "name": src.name if src else r.source_id,
            "type": src.type if src else "Unknown",
            "status": src.status if src else "Active"
        },
        "supporting_reports": supporting_reps
    }

@router.post("", response_model=dict)
def create_report(payload: ReportCreateSchema, db: Session = Depends(get_db)):
    result = process_incoming_report(
        db=db,
        source_id=payload.source_id,
        content=payload.content,
        city=payload.city,
        state=payload.state,
        latitude=payload.latitude,
        longitude=payload.longitude,
        media_url=payload.media_url,
        timestamp=payload.timestamp
    )
    return result

# SIMULATE LIVE REPORT trigger
SIMULATION_TEMPLATES = [
    {
        "source_id": "SRC-CITIZEN",
        "city": "Hyderabad",
        "state": "Telangana",
        "lat": 17.4955,
        "lng": 78.3975,
        "content": "Live Citizen Alert: Heavy waterlogging near Kukatpally flyover slowing down evening traffic.",
        "media_url": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80"
    },
    {
        "source_id": "SRC-TWITTER",
        "city": "Mumbai",
        "state": "Maharashtra",
        "lat": 19.1136,
        "lng": 72.8697,
        "content": "Heavy monsoon downpour in Andheri East subway. Avoid the route!",
        "media_url": None
    },
    {
        "source_id": "SRC-IMD",
        "city": "Bengaluru",
        "state": "Karnataka",
        "lat": 12.9352,
        "lng": 77.6245,
        "content": "Automated Sensor: 45mm rainfall recorded in last 30 minutes over Koramangala.",
        "media_url": None
    },
    {
        "source_id": "SRC-CITIZEN",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "lat": 13.0418,
        "lng": 80.2341,
        "content": "Thunderstorm and lightning strike near T Nagar. Power outage reported.",
        "media_url": None
    }
]

@router.post("/simulate", response_model=dict)
async def simulate_live_report(db: Session = Depends(get_db)):
    sample = random.choice(SIMULATION_TEMPLATES)
    result = process_incoming_report(
        db=db,
        source_id=sample["source_id"],
        content=sample["content"],
        city=sample["city"],
        state=sample["state"],
        latitude=sample["lat"],
        longitude=sample["lng"],
        media_url=sample["media_url"],
        timestamp=datetime.utcnow()
    )

    # Broadcast real-time update via WebSocket
    await manager.broadcast({
        "type": "NEW_REPORT_SIMULATED",
        "data": result
    })

    return result

@router.post("/{report_id}/verify")
def verify_report(report_id: str, db: Session = Depends(get_db)):
    r = db.query(Report).filter(Report.id == report_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Report not found")
    
    r.verification_status = "Verified"
    r.reliability_score = max(r.reliability_score, 85.0)
    
    act = VerificationAction(
        report_id=r.id,
        action="Verified",
        actor="Admin Operator",
        notes="Manually verified by Command Center Administrator"
    )
    db.add(act)
    db.commit()
    return {"message": "Report verified successfully", "status": "Verified"}

@router.post("/{report_id}/suspicious")
def mark_suspicious(report_id: str, db: Session = Depends(get_db)):
    r = db.query(Report).filter(Report.id == report_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Report not found")
    
    r.verification_status = "Suspicious"
    r.reliability_score = min(r.reliability_score, 30.0)
    
    act = VerificationAction(
        report_id=r.id,
        action="Marked Suspicious",
        actor="Admin Operator",
        notes="Flagged as suspicious by operator"
    )
    db.add(act)
    db.commit()
    return {"message": "Report marked suspicious", "status": "Suspicious"}

@router.post("/{report_id}/duplicate")
def mark_duplicate(report_id: str, db: Session = Depends(get_db)):
    r = db.query(Report).filter(Report.id == report_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Report not found")
    
    r.is_duplicate = True
    r.duplicate_score = 95.0
    r.verification_status = "Suspicious"
    
    act = VerificationAction(
        report_id=r.id,
        action="Marked Duplicate",
        actor="Admin Operator",
        notes="Confirmed duplicate by operator"
    )
    db.add(act)
    db.commit()
    return {"message": "Report marked duplicate", "is_duplicate": True}
