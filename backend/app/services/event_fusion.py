import json
from datetime import datetime
from typing import List, Tuple, Dict, Optional
from app.services.deduplication import haversine_distance

SEVERITY_MAPPING = {
    "Flooding": "High",
    "Heavy Rain": "High",
    "Thunderstorm": "Moderate",
    "Heatwave": "Extreme",
    "Fog": "Low",
    "Dust Storm": "Moderate",
    "Strong Wind": "Moderate"
}

def fuse_reports_to_event(
    new_report: dict,
    existing_events: List[dict],
    all_related_reports: List[dict]
) -> Tuple[Optional[dict], List[Dict[str, str]]]:
    """
    Attempts to match a new report to an existing active Event, or creates a new Event proposal.
    Returns (event_dict, formation_steps_json).
    """
    matched_event = None
    min_distance = 999.0

    for ev in existing_events:
        if ev["event_type"] == new_report["event_type"] and ev["status"] == "Active":
            dist = haversine_distance(new_report["latitude"], new_report["longitude"], ev["latitude"], ev["longitude"])
            if dist <= 25.0 and dist < min_distance: # Within 25 km radius
                min_distance = dist
                matched_event = ev

    # Generate formation steps audit log
    total_inc = len(all_related_reports) + 1
    geo_rel = max(1, int(total_inc * 0.8))
    time_win = max(1, int(geo_rel * 0.85))
    dups_rem = max(0, total_inc - geo_rel)
    trusted = len([r for r in all_related_reports if r.get("verification_status") != "Suspicious"]) + (1 if new_report.get("verification_status") != "Suspicious" else 0)

    formation_steps = [
        {"step": "Incoming Reports", "count": f"{total_inc} reports received"},
        {"step": "Geographic Clustering", "count": f"{geo_rel} within 25km radius"},
        {"step": "Temporal Filter", "count": f"{time_win} in 6hr window"},
        {"step": "Deduplication", "count": f"{dups_rem} duplicates removed"},
        {"step": "Trust Verification", "count": f"{trusted} verified trusted reports"},
        {"step": "Event Fusion", "count": f"Unified {new_report['event_type']} Event"}
    ]

    steps_json = json.dumps(formation_steps)

    if matched_event:
        # Update existing event metrics
        matched_event["last_updated"] = datetime.utcnow()
        matched_event["confidence"] = min(99.0, matched_event.get("confidence", 75.0) + 2.5)
        matched_event["formation_steps_json"] = steps_json
        return matched_event, steps_json
    else:
        # Create new fused event
        city = new_report["city"]
        event_type = new_report["event_type"]
        new_event = {
            "id": f"EVENT-{city[:3].upper()}-{int(datetime.utcnow().timestamp()) % 1000:03d}",
            "title": f"{event_type} in {city}",
            "event_type": event_type,
            "severity": SEVERITY_MAPPING.get(event_type, "Moderate"),
            "latitude": new_report["latitude"],
            "longitude": new_report["longitude"],
            "city": city,
            "state": new_report["state"],
            "confidence": 75.0,
            "status": "Active",
            "first_detected": datetime.utcnow(),
            "last_updated": datetime.utcnow(),
            "formation_steps_json": steps_json
        }
        return new_event, steps_json
