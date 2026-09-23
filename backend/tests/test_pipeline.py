import pytest
from datetime import datetime, timedelta
from app.services.classification import classify_weather_event
from app.services.deduplication import haversine_distance, calculate_duplicate_score
from app.services.reliability import evaluate_report_reliability
from app.services.event_fusion import fuse_reports_to_event
from app.services.location import extract_location_from_text, resolve_location

def test_event_classification():
    cat, score = classify_weather_event("Waterlogging and severe flood near Kukatpally")
    assert cat == "Flooding"
    assert score >= 70.0

    cat_dust, _ = classify_weather_event("Dense dust storm in Delhi today")
    assert cat_dust == "Dust Storm"

def test_location_extraction():
    loc = extract_location_from_text("Traffic jam near Kukatpally metro station in Hyderabad")
    assert loc is not None
    assert loc["city"] == "Hyderabad"
    assert loc["state"] == "Telangana"

def test_haversine_distance():
    # Kukatpally to JNTU is approximately ~1.5 km
    dist = haversine_distance(17.4948, 78.3996, 17.4981, 78.3915)
    assert 0.5 < dist < 3.0

def test_deduplication_scoring():
    now = datetime.utcnow()
    existing = [
        {
            "id": "REP-001",
            "content": "Heavy rain and flooding near Kukatpally metro",
            "latitude": 17.4948,
            "longitude": 78.3996,
            "timestamp": now - timedelta(minutes=15)
        }
    ]

    # Similar report nearby
    score, is_dup, match_id = calculate_duplicate_score(
        "Heavy rain and flooding near Kukatpally metro station",
        17.4950,
        78.3995,
        now,
        existing
    )
    assert is_dup is True
    assert score >= 70.0
    assert match_id == "REP-001"

def test_reliability_scoring():
    now = datetime.utcnow()
    # Trusted recent report with GPS coordinates & government source
    score_trusted, status_trusted, reasons_json = evaluate_report_reliability(
        content="IMD Doppler radar 80mm/hr rainfall reading",
        timestamp=now - timedelta(minutes=10),
        lat=17.4948,
        lng=78.3996,
        source_type="Government Weather Data"
    )
    assert score_trusted >= 75.0
    assert status_trusted == "Verified"

    # Suspicious old report with recycled media
    score_susp, status_susp, reasons_susp = evaluate_report_reliability(
        content="Massive old bridge break flood",
        timestamp=now - timedelta(days=10),
        lat=17.4948,
        lng=78.3996,
        source_type="Social Media",
        media_url="recycled_stock_flood.jpg"
    )
    assert score_susp < 45.0
    assert status_susp == "Suspicious"

def test_event_fusion():
    new_rep = {
        "event_type": "Flooding",
        "city": "Hyderabad",
        "state": "Telangana",
        "latitude": 17.4948,
        "longitude": 78.3996,
        "verification_status": "Verified"
    }

    events = [
        {
            "id": "EVENT-HYD-001",
            "title": "Urban Flooding in Kukatpally",
            "event_type": "Flooding",
            "status": "Active",
            "latitude": 17.4950,
            "longitude": 78.3990,
            "confidence": 85.0
        }
    ]

    matched_event, steps_json = fuse_reports_to_event(new_rep, events, [])
    assert matched_event is not None
    assert matched_event["id"] == "EVENT-HYD-001"
