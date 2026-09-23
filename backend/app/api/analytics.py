from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.core.database import get_db
from app.models.domain import Report, Event, Source

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("")
def get_analytics(db: Session = Depends(get_db)):
    total_reports = db.query(Report).count()
    verified_count = db.query(Report).filter(Report.verification_status == "Verified").count()
    suspicious_count = db.query(Report).filter(Report.verification_status == "Suspicious").count()
    pending_count = db.query(Report).filter(Report.verification_status == "Pending").count()
    duplicate_count = db.query(Report).filter(Report.is_duplicate == True).count()

    # Reports by event type
    categories = ["Heavy Rain", "Flooding", "Thunderstorm", "Heatwave", "Fog", "Dust Storm", "Strong Wind"]
    event_distribution = []
    for cat in categories:
        count = db.query(Report).filter(Report.event_type == cat).count()
        event_distribution.append({"name": cat, "count": count})

    # Reports by State
    states_query = db.query(Report.state, func.count(Report.id)).group_by(Report.state).all()
    state_distribution = [{"state": s[0], "count": s[1]} for s in states_query]

    # Source distribution
    sources = db.query(Source).all()
    source_distribution = []
    for s in sources:
        cnt = db.query(Report).filter(Report.source_id == s.id).count()
        source_distribution.append({"source": s.name, "type": s.type, "count": cnt})

    # Event Severity distribution
    severities = ["Extreme", "High", "Moderate", "Low"]
    severity_distribution = []
    for sev in severities:
        cnt = db.query(Event).filter(Event.severity == sev).count()
        severity_distribution.append({"severity": sev, "count": cnt})

    # Top Affected Cities
    top_cities_query = db.query(Report.city, func.count(Report.id)).group_by(Report.city).order_by(func.count(Report.id).desc()).limit(7).all()
    top_locations = [{"city": c[0], "count": c[1]} for c in top_cities_query]

    # Timeline reports (simulated hourly breakdown for last 24h)
    timeline_data = []
    now = datetime.utcnow()
    for i in range(12, -1, -1):
        t_slot = now - timedelta(hours=i*2)
        slot_str = t_slot.strftime("%H:00")
        # Count approximate for slot
        cnt = random_hash_count(t_slot, total_reports)
        timeline_data.append({"time": slot_str, "reports": cnt, "events": max(1, int(cnt * 0.4))})

    return {
        "summary": {
            "total_reports": total_reports,
            "verified_count": verified_count,
            "suspicious_count": suspicious_count,
            "pending_count": pending_count,
            "duplicate_count": duplicate_count,
            "duplicate_rate": round((duplicate_count / max(1, total_reports)) * 100.0, 1),
            "verification_rate": round((verified_count / max(1, total_reports)) * 100.0, 1)
        },
        "reports_by_event": event_distribution,
        "reports_by_state": state_distribution,
        "source_distribution": source_distribution,
        "severity_distribution": severity_distribution,
        "top_locations": top_locations,
        "timeline": timeline_data
    }

def random_hash_count(dt: datetime, base: int) -> int:
    seed_val = int(dt.timestamp()) % 17
    return max(2, (seed_val * 3) + (base % 5))
