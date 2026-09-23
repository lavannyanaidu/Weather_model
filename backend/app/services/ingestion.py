from datetime import datetime
from sqlalchemy.orm import Session
from app.models.domain import Report, Event, EventReport, Source
from app.services.location import resolve_location
from app.services.classification import classify_weather_event
from app.services.deduplication import calculate_duplicate_score
from app.services.reliability import evaluate_report_reliability
from app.services.event_fusion import fuse_reports_to_event
import json

def process_incoming_report(
    db: Session,
    source_id: str,
    content: str,
    city: str = None,
    state: str = None,
    latitude: float = None,
    longitude: float = None,
    media_url: str = None,
    timestamp: datetime = None
) -> Tuple_Type if False else dict:
    if timestamp is None:
        timestamp = datetime.utcnow()

    # Step 1: Source lookup
    src = db.query(Source).filter(Source.id == source_id).first()
    source_type = src.type if src else "Citizen Reports"
    source_name = src.name if src else "Public Feed"

    # Update source ingestion counter
    if src:
        src.records_ingested += 1
        src.last_ingestion = datetime.utcnow()

    # Step 2: Location Extraction / Geocoding
    r_city, r_state, r_lat, r_lng = resolve_location(content, city, state, latitude, longitude)

    # Step 3: Event Classification
    event_type, cls_confidence = classify_weather_event(content)

    # Step 4: Deduplication Check
    existing_reports = [
        {
            "id": r.id,
            "content": r.content,
            "latitude": r.latitude,
            "longitude": r.longitude,
            "timestamp": r.timestamp
        }
        for r in db.query(Report).all()
    ]

    dup_score, is_duplicate, match_id = calculate_duplicate_score(
        content, r_lat, r_lng, timestamp, existing_reports
    )

    # Step 5: Reliability Evaluation & Fake Detection
    nearby_reps = [
        {"latitude": r.latitude, "longitude": r.longitude}
        for r in db.query(Report).filter(Report.city == r_city).all()
    ]

    reliability_score, verification_status, reasons_json = evaluate_report_reliability(
        content=content,
        timestamp=timestamp,
        lat=r_lat,
        lng=r_lng,
        source_type=source_type,
        media_url=media_url,
        nearby_reports=nearby_reps
    )

    if is_duplicate:
        verification_status = "Suspicious"
        reasons = json.loads(reasons_json)
        reasons.append({"type": "suspicious", "text": f"Flagged as duplicate of report {match_id} (Score: {dup_score}%)"})
        reasons_json = json.dumps(reasons)

    # Save new report
    report_id = f"REP-{int(datetime.utcnow().timestamp() * 1000) % 100000:05d}"
    new_report = Report(
        id=report_id,
        source_id=source_id,
        timestamp=timestamp,
        content=content,
        latitude=r_lat,
        longitude=r_lng,
        city=r_city,
        state=r_state,
        event_type=event_type,
        media_url=media_url,
        verification_status=verification_status,
        reliability_score=reliability_score,
        duplicate_score=dup_score,
        is_duplicate=is_duplicate,
        reasons_json=reasons_json,
        created_at=datetime.utcnow()
    )

    db.add(new_report)
    db.commit()

    # Step 6: Event Fusion
    existing_events = [
        {
            "id": e.id,
            "title": e.title,
            "event_type": e.event_type,
            "status": e.status,
            "latitude": e.latitude,
            "longitude": e.longitude,
            "confidence": e.confidence
        }
        for e in db.query(Event).all()
    ]

    city_reports = [
        {"verification_status": r.verification_status}
        for r in db.query(Report).filter(Report.city == r_city).all()
    ]

    event_dict, formation_json = fuse_reports_to_event(
        new_report={
            "event_type": event_type,
            "city": r_city,
            "state": r_state,
            "latitude": r_lat,
            "longitude": r_lng,
            "verification_status": verification_status
        },
        existing_events=existing_events,
        all_related_reports=city_reports
    )

    target_event = None
    if event_dict:
        target_event = db.query(Event).filter(Event.id == event_dict["id"]).first()
        if not target_event:
            target_event = Event(
                id=event_dict["id"],
                title=event_dict["title"],
                event_type=event_dict["event_type"],
                severity=event_dict["severity"],
                latitude=event_dict["latitude"],
                longitude=event_dict["longitude"],
                city=event_dict["city"],
                state=event_dict["state"],
                confidence=event_dict["confidence"],
                status=event_dict["status"],
                first_detected=event_dict["first_detected"],
                last_updated=event_dict["last_updated"],
                formation_steps_json=formation_json
            )
            db.add(target_event)
            db.commit()

        # Link Report to Event
        link = EventReport(event_id=target_event.id, report_id=new_report.id)
        db.add(link)
        db.commit()

    return {
        "report": {
            "id": new_report.id,
            "source_id": new_report.source_id,
            "source_name": source_name,
            "timestamp": new_report.timestamp.isoformat(),
            "content": new_report.content,
            "latitude": new_report.latitude,
            "longitude": new_report.longitude,
            "city": new_report.city,
            "state": new_report.state,
            "event_type": new_report.event_type,
            "media_url": new_report.media_url,
            "verification_status": new_report.verification_status,
            "reliability_score": new_report.reliability_score,
            "duplicate_score": new_report.duplicate_score,
            "is_duplicate": new_report.is_duplicate,
            "reasons_json": new_report.reasons_json,
            "created_at": new_report.created_at.isoformat()
        },
        "event_id": target_event.id if target_event else None,
        "pipeline_steps": [
            {"step": "1. Ingestion", "status": "Complete", "detail": f"Received report from {source_name}"},
            {"step": "2. AI Processing", "status": "Complete", "detail": f"Confidence: {cls_confidence}%"},
            {"step": "3. Location Extracted", "status": "Complete", "detail": f"{r_city}, {r_state} ({r_lat}, {r_lng})"},
            {"step": "4. Classification", "status": "Complete", "detail": f"Category: {event_type}"},
            {"step": "5. Duplicate Check", "status": "Complete", "detail": f"Duplicate score: {dup_score}% ({'YES' if is_duplicate else 'NO'})"},
            {"step": "6. Reliability Score", "status": "Complete", "detail": f"Score: {reliability_score}% ({verification_status})"},
            {"step": "7. Event Fusion", "status": "Complete", "detail": f"Fused into {target_event.id if target_event else 'New Event'}"}
        ]
    }
