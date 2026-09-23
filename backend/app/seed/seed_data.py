import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.domain import Source, Report, Event, EventReport, VerificationAction

def seed_database(db: Session):
    # Clear existing
    db.query(EventReport).delete()
    db.query(VerificationAction).delete()
    db.query(Report).delete()
    db.query(Event).delete()
    db.query(Source).delete()
    db.commit()

    # 1. Sources
    sources_data = [
        {"id": "SRC-IMD", "name": "IMD Automated Radar Stream", "type": "Government Weather Data", "status": "Active", "records_ingested": 1420, "error_count": 0},
        {"id": "SRC-CITIZEN", "name": "MoES Public Mobile Reporter", "type": "Citizen Reports", "status": "Active", "records_ingested": 850, "error_count": 2},
        {"id": "SRC-TWITTER", "name": "Social Intelligence Stream", "type": "Social Media", "status": "Active", "records_ingested": 3120, "error_count": 14},
        {"id": "SRC-API-OPEN", "name": "Global Synoptic Weather API", "type": "Public APIs", "status": "Active", "records_ingested": 590, "error_count": 1},
        {"id": "SRC-NEWS", "name": "National News Aggregator", "type": "Websites", "status": "Active", "records_ingested": 410, "error_count": 0},
    ]

    for s in sources_data:
        src = Source(
            id=s["id"],
            name=s["name"],
            type=s["type"],
            status=s["status"],
            last_ingestion=datetime.utcnow(),
            records_ingested=s["records_ingested"],
            error_count=s["error_count"]
        )
        db.add(src)
    db.commit()

    now = datetime.utcnow()

    # 2. Main Fused Event: EVENT HYD-001 (Urban Flooding in Kukatpally, Hyderabad)
    hyd_formation_steps = [
        {"step": "Incoming Reports", "count": "17 reports received"},
        {"step": "Geographic Clustering", "count": "12 within 5km of Kukatpally"},
        {"step": "Temporal Filter", "count": "9 within 3-hour storm window"},
        {"step": "Deduplication", "count": "4 duplicate reports removed"},
        {"step": "Trust Verification", "count": "5 verified high-confidence reports"},
        {"step": "Event Fusion", "count": "Unified Urban Flooding Event Created"}
    ]

    event_hyd = Event(
        id="EVENT-HYD-001",
        title="Urban Flooding near Kukatpally & JNTU",
        event_type="Flooding",
        severity="Extreme",
        latitude=17.4948,
        longitude=78.3996,
        city="Hyderabad",
        state="Telangana",
        confidence=96.5,
        status="Active",
        first_detected=now - timedelta(hours=3),
        last_updated=now - timedelta(minutes=10),
        formation_steps_json=json.dumps(hyd_formation_steps)
    )
    db.add(event_hyd)

    # Other events across India
    events_data = [
        {
            "id": "EVENT-BOM-002",
            "title": "Heavy Monsoon Downpour in Bandra-Andheri Belt",
            "event_type": "Heavy Rain",
            "severity": "High",
            "latitude": 19.0760,
            "longitude": 72.8777,
            "city": "Mumbai",
            "state": "Maharashtra",
            "confidence": 92.0,
            "status": "Active",
            "first_detected": now - timedelta(hours=5),
            "last_updated": now - timedelta(minutes=25)
        },
        {
            "id": "EVENT-DEL-003",
            "title": "Severe Dust Storm & Squall",
            "event_type": "Dust Storm",
            "severity": "Moderate",
            "latitude": 28.6139,
            "longitude": 77.2090,
            "city": "Delhi",
            "state": "Delhi",
            "confidence": 88.0,
            "status": "Active",
            "first_detected": now - timedelta(hours=2),
            "last_updated": now - timedelta(minutes=15)
        },
        {
            "id": "EVENT-MAA-004",
            "title": "Coastal Thunderstorm Alert",
            "event_type": "Thunderstorm",
            "severity": "Moderate",
            "latitude": 13.0827,
            "longitude": 80.2707,
            "city": "Chennai",
            "state": "Tamil Nadu",
            "confidence": 84.0,
            "status": "Active",
            "first_detected": now - timedelta(hours=4),
            "last_updated": now - timedelta(minutes=45)
        },
        {
            "id": "EVENT-CCU-005",
            "title": "Low Visibility Dense Fog Warning",
            "event_type": "Fog",
            "severity": "Low",
            "latitude": 22.5726,
            "longitude": 88.3639,
            "city": "Kolkata",
            "state": "West Bengal",
            "confidence": 79.0,
            "status": "Monitoring",
            "first_detected": now - timedelta(hours=8),
            "last_updated": now - timedelta(hours=1)
        },
        {
            "id": "EVENT-BLR-006",
            "title": "Heavy Downpour in Koramangala",
            "event_type": "Heavy Rain",
            "severity": "Moderate",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "city": "Bengaluru",
            "state": "Karnataka",
            "confidence": 89.0,
            "status": "Active",
            "first_detected": now - timedelta(hours=1),
            "last_updated": now - timedelta(minutes=5)
        }
    ]

    for ed in events_data:
        ev = Event(
            id=ed["id"],
            title=ed["title"],
            event_type=ed["event_type"],
            severity=ed["severity"],
            latitude=ed["latitude"],
            longitude=ed["longitude"],
            city=ed["city"],
            state=ed["state"],
            confidence=ed["confidence"],
            status=ed["status"],
            first_detected=ed["first_detected"],
            last_updated=ed["last_updated"],
            formation_steps_json=json.dumps([
                {"step": "Incoming Reports", "count": "8 reports"},
                {"step": "Geographic Clustering", "count": "6 within zone"},
                {"step": "Event Fusion", "count": f"Fused into {ed['id']}"}
            ])
        )
        db.add(ev)
    db.commit()

    # 3. Reports for Hyderabad Urban Flooding Scenario (Reports A, B, C, D, E)
    hyd_reports = [
        {
            "id": "REP-HYD-001",
            "source_id": "SRC-TWITTER",
            "timestamp": now - timedelta(minutes=45),
            "content": "Heavy rain near Kukatpally metro station. Traffic halted due to 2 feet water logging.",
            "latitude": 17.4948,
            "longitude": 78.3996,
            "city": "Hyderabad",
            "state": "Telangana",
            "event_type": "Heavy Rain",
            "media_url": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
            "verification_status": "Verified",
            "reliability_score": 94.0,
            "duplicate_score": 0.0,
            "is_duplicate": False,
            "reasons": [
                {"type": "trusted", "text": "Recent timestamp (within 1 hour)"},
                {"type": "trusted", "text": "Valid geographic coordinates near Kukatpally"},
                {"type": "trusted", "text": "Supported by 4 adjacent citizen reports"}
            ]
        },
        {
            "id": "REP-HYD-002",
            "source_id": "SRC-CITIZEN",
            "timestamp": now - timedelta(minutes=40),
            "content": "Water logging near Kukatpally main road underpass. Vehicles getting stranded.",
            "latitude": 17.4960,
            "longitude": 78.3980,
            "city": "Hyderabad",
            "state": "Telangana",
            "event_type": "Flooding",
            "media_url": None,
            "verification_status": "Verified",
            "reliability_score": 91.0,
            "duplicate_score": 15.0,
            "is_duplicate": False,
            "reasons": [
                {"type": "trusted", "text": "Recent timestamp"},
                {"type": "trusted", "text": "Cross-verified with IMD Doppler radar grid"},
                {"type": "trusted", "text": "High spatial proximity to Kukatpally cluster"}
            ]
        },
        {
            "id": "REP-HYD-003",
            "source_id": "SRC-CITIZEN",
            "timestamp": now - timedelta(minutes=30),
            "content": "Severe flooding near JNTU campus gates. Water entering low lying shops.",
            "latitude": 17.4981,
            "longitude": 78.3915,
            "city": "Hyderabad",
            "state": "Telangana",
            "event_type": "Flooding",
            "media_url": "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
            "verification_status": "Verified",
            "reliability_score": 96.0,
            "duplicate_score": 10.0,
            "is_duplicate": False,
            "reasons": [
                {"type": "trusted", "text": "Official MoES app submission with verified EXIF location"},
                {"type": "trusted", "text": "Supported by radar & social sentiment analysis"},
                {"type": "trusted", "text": "Valid coordinates at JNTU Hyderabad"}
            ]
        },
        {
            "id": "REP-HYD-004",
            "source_id": "SRC-TWITTER",
            "timestamp": now - timedelta(minutes=20),
            "content": "Citizen photo showing deep water logging in Kukatpally Housing Board (KPHB) Colony.",
            "latitude": 17.4920,
            "longitude": 78.4020,
            "city": "Hyderabad",
            "state": "Telangana",
            "event_type": "Flooding",
            "media_url": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80",
            "verification_status": "Verified",
            "reliability_score": 88.0,
            "duplicate_score": 35.0,
            "is_duplicate": False,
            "reasons": [
                {"type": "trusted", "text": "Recent timestamp"},
                {"type": "trusted", "text": "Image perceptual hash verified against stock database"}
            ]
        },
        {
            "id": "REP-HYD-005",
            "source_id": "SRC-NEWS",
            "timestamp": now - timedelta(minutes=15),
            "content": "Social media report describing heavy rain and waterlogging across Kukatpally and JNTU corridor.",
            "latitude": 17.4950,
            "longitude": 78.3950,
            "city": "Hyderabad",
            "state": "Telangana",
            "event_type": "Flooding",
            "media_url": None,
            "verification_status": "Verified",
            "reliability_score": 89.0,
            "duplicate_score": 68.0,
            "is_duplicate": True, # Marked as duplicate of REP-HYD-001/003
            "reasons": [
                {"type": "trusted", "text": "Source verified as accredited news agency"},
                {"type": "suspicious", "text": "Content similarity 68% matched with REP-HYD-001"}
            ]
        }
    ]

    # Suspicious report for scenario demo
    suspicious_reports = [
        {
            "id": "REP-SUSP-001",
            "source_id": "SRC-TWITTER",
            "timestamp": now - timedelta(days=14), # Old timestamp
            "content": "Catastrophic cloudburst and dam breach flooding whole city near old bridge! RUN!",
            "latitude": 17.3850,
            "longitude": 78.4867,
            "city": "Hyderabad",
            "state": "Telangana",
            "event_type": "Flooding",
            "media_url": "https://example.com/recycled_stock_flood_2019.jpg",
            "verification_status": "Suspicious",
            "reliability_score": 18.0,
            "duplicate_score": 82.0,
            "is_duplicate": True,
            "reasons": [
                {"type": "suspicious", "text": "Old timestamp (14 days old recycled post)"},
                {"type": "suspicious", "text": "No nearby supporting weather observations within 20km"},
                {"type": "suspicious", "text": "Image match detected in known recycled disaster media index"},
                {"type": "suspicious", "text": "Inconsistent with IMD radar precipitation readings (0mm recorded at location)"}
            ]
        },
        {
            "id": "REP-SUSP-002",
            "source_id": "SRC-TWITTER",
            "timestamp": now - timedelta(hours=12),
            "content": "Huge dust storm in central Mumbai causing zero visibility!",
            "latitude": 19.0760,
            "longitude": 72.8777,
            "city": "Mumbai",
            "state": "Maharashtra",
            "event_type": "Dust Storm",
            "media_url": None,
            "verification_status": "Suspicious",
            "reliability_score": 32.0,
            "duplicate_score": 5.0,
            "is_duplicate": False,
            "reasons": [
                {"type": "suspicious", "text": "Dust Storm event category highly unusual for coastal Mumbai geography"},
                {"type": "suspicious", "text": "Humidity index 85% contradicts dust storm meteorological preconditions"},
                {"type": "suspicious", "text": "Single isolated unverified tweet without photos"}
            ]
        }
    ]

    # General national reports
    national_reports = [
        {
            "id": "REP-BOM-101",
            "source_id": "SRC-IMD",
            "timestamp": now - timedelta(hours=2),
            "content": "IMD Doppler radar records 85mm/hr rain intensity in Bandra Kurla Complex.",
            "latitude": 19.0596,
            "longitude": 72.8295,
            "city": "Mumbai",
            "state": "Maharashtra",
            "event_type": "Heavy Rain",
            "media_url": None,
            "verification_status": "Verified",
            "reliability_score": 98.0,
            "duplicate_score": 0.0,
            "is_duplicate": False,
            "reasons": [{"type": "trusted", "text": "Official IMD Radar telemetric dataset"}]
        },
        {
            "id": "REP-DEL-102",
            "source_id": "SRC-NEWS",
            "timestamp": now - timedelta(hours=1),
            "content": "Strong dust storm with winds up to 55 km/h hits Central Delhi and Dwarka.",
            "latitude": 28.6315,
            "longitude": 77.2167,
            "city": "Delhi",
            "state": "Delhi",
            "event_type": "Dust Storm",
            "media_url": None,
            "verification_status": "Verified",
            "reliability_score": 86.0,
            "duplicate_score": 0.0,
            "is_duplicate": False,
            "reasons": [{"type": "trusted", "text": "Confirmed by Delhi Airport Anemometer"}]
        },
        {
            "id": "REP-BLR-103",
            "source_id": "SRC-CITIZEN",
            "timestamp": now - timedelta(minutes=45),
            "content": "Water pooling on 100 Feet Road Koramangala after 40 min downpour.",
            "latitude": 12.9352,
            "longitude": 77.6245,
            "city": "Bengaluru",
            "state": "Karnataka",
            "event_type": "Heavy Rain",
            "media_url": None,
            "verification_status": "Verified",
            "reliability_score": 90.0,
            "duplicate_score": 5.0,
            "is_duplicate": False,
            "reasons": [{"type": "trusted", "text": "Recent timestamp and valid Bengaluru coordinates"}]
        }
    ]

    all_seed_reports = hyd_reports + suspicious_reports + national_reports

    for r in all_seed_reports:
        rep = Report(
            id=r["id"],
            source_id=r["source_id"],
            timestamp=r["timestamp"],
            content=r["content"],
            latitude=r["latitude"],
            longitude=r["longitude"],
            city=r["city"],
            state=r["state"],
            event_type=r["event_type"],
            media_url=r["media_url"],
            verification_status=r["verification_status"],
            reliability_score=r["reliability_score"],
            duplicate_score=r["duplicate_score"],
            is_duplicate=r["is_duplicate"],
            reasons_json=json.dumps(r["reasons"]),
            created_at=r["timestamp"]
        )
        db.add(rep)

        # Link Hyderabad reports to EVENT-HYD-001
        if r["id"].startswith("REP-HYD"):
            link = EventReport(event_id="EVENT-HYD-001", report_id=r["id"])
            db.add(link)

        # Link Mumbai report to EVENT-BOM-002
        if r["id"] == "REP-BOM-101":
            link = EventReport(event_id="EVENT-BOM-002", report_id=r["id"])
            db.add(link)

        # Link Delhi report to EVENT-DEL-003
        if r["id"] == "REP-DEL-102":
            link = EventReport(event_id="EVENT-DEL-003", report_id=r["id"])
            db.add(link)

        # Link Bengaluru report to EVENT-BLR-006
        if r["id"] == "REP-BLR-103":
            link = EventReport(event_id="EVENT-BLR-006", report_id=r["id"])
            db.add(link)

    # Verification Actions log
    v_actions = [
        VerificationAction(report_id="REP-HYD-001", action="Verified", actor="Admin Operator", timestamp=now - timedelta(minutes=40), notes="Validated with Kukatpally Traffic Control CCTV"),
        VerificationAction(report_id="REP-HYD-005", action="Marked Duplicate", actor="AI Automated Deduplicator", timestamp=now - timedelta(minutes=14), notes="Matched REP-HYD-001 with 68% confidence"),
        VerificationAction(report_id="REP-SUSP-001", action="Marked Suspicious", actor="AI Anomaly Detector", timestamp=now - timedelta(days=1), notes="Flagged for recycled media hash and stale timestamp")
    ]
    for act in v_actions:
        db.add(act)

    db.commit()
    print("Database successfully seeded with realistic Indian weather events and Hyderabad scenario!")
