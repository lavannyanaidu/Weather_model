import json
from datetime import datetime, timezone
from typing import Tuple, List, Dict
from app.services.deduplication import haversine_distance

def evaluate_report_reliability(
    content: str,
    timestamp: datetime,
    lat: float,
    lng: float,
    source_type: str,
    media_url: str = None,
    nearby_reports: List[dict] = None
) -> Tuple[float, str, List[Dict[str, str]]]:
    """
    Evaluates report reliability (0 to 100) and returns (score, verification_status, reasons_list)
    where reasons_list items have format {"type": "trusted"|"suspicious", "text": "Reason text"}.
    """
    if nearby_reports is None:
        nearby_reports = []

    score = 50.0
    reasons = []

    # Rule 1: Timestamp check
    now = datetime.utcnow()
    # Check if naive datetime
    if timestamp.tzinfo is not None:
        timestamp_naive = timestamp.replace(tzinfo=None)
    else:
        timestamp_naive = timestamp

    age_hours = (now - timestamp_naive).total_seconds() / 3600.0

    if age_hours <= 6.0:
        score += 15.0
        reasons.append({"type": "trusted", "text": "Recent timestamp (within 6 hours)"})
    elif age_hours > 72.0: # Older than 3 days
        score -= 30.0
        reasons.append({"type": "suspicious", "text": f"Old timestamp ({int(age_hours/24)} days old)"})
    else:
        reasons.append({"type": "trusted", "text": f"Timestamp recorded ({int(age_hours)} hours ago)"})

    # Rule 2: Valid Geographic Coordinates
    if 6.0 <= lat <= 38.0 and 68.0 <= lng <= 97.0: # Boundaries of India
        score += 15.0
        reasons.append({"type": "trusted", "text": "Valid geographic coordinates within Indian territory"})
    else:
        score -= 35.0
        reasons.append({"type": "suspicious", "text": "Location outside valid national boundaries or unverified GPS"})

    # Rule 3: Source Trust Factor
    if source_type in ["Government Weather Data", "MoES Weather Station"]:
        score += 20.0
        reasons.append({"type": "trusted", "text": "Official government meteorological sensor feed"})
    elif source_type in ["Public APIs", "Websites"]:
        score += 10.0
        reasons.append({"type": "trusted", "text": "Verified public API source"})
    elif source_type == "Citizen Reports":
        score += 5.0
        reasons.append({"type": "trusted", "text": "Citizen report with attached location metadata"})
    elif source_type == "Social Media":
        reasons.append({"type": "suspicious", "text": "Unverified social media post stream"})

    # Rule 4: Nearby Supporting Reports
    spatial_support_count = 0
    for rep in nearby_reports:
        dist = haversine_distance(lat, lng, rep["latitude"], rep["longitude"])
        if dist <= 10.0:
            spatial_support_count += 1

    if spatial_support_count >= 2:
        score += 20.0
        reasons.append({"type": "trusted", "text": f"Supported by {spatial_support_count} nearby weather reports"})
    elif spatial_support_count == 0:
        score -= 15.0
        reasons.append({"type": "suspicious", "text": "No nearby supporting reports detected within 10 km"})

    # Rule 5: Recycled / Suspicious Media check
    if media_url and ("recycled" in media_url or "old_stock" in media_url or "fake" in content.lower()):
        score -= 40.0
        reasons.append({"type": "suspicious", "text": "Possible recycled or manipulated media detected by image fingerprint hash"})
    elif media_url:
        score += 10.0
        reasons.append({"type": "trusted", "text": "Includes original photo/video evidence"})

    # Final score clamping
    score = max(5.0, min(99.0, round(score, 1)))

    if score >= 70.0:
        status = "Verified"
    elif score < 45.0:
        status = "Suspicious"
    else:
        status = "Pending"

    return score, status, json.dumps(reasons)
