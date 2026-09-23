import math
from typing import List, Tuple
from datetime import datetime

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates in kilometers using Haversine formula."""
    R = 6371.0 # Radius of Earth in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def text_similarity(text1: str, text2: str) -> float:
    """Jaccard similarity coefficient between two texts."""
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())
    if not words1 or not words2:
        return 0.0
    intersection = words1.intersection(words2)
    union = words1.union(words2)
    return (len(intersection) / len(union)) * 100.0

def calculate_duplicate_score(
    new_report_content: str,
    new_lat: float,
    new_lng: float,
    new_time: datetime,
    existing_reports: List[dict]
) -> Tuple[float, bool, str]:
    """
    Compares new report against existing reports within 15km and 4 hours window.
    Returns (highest_dup_score, is_duplicate, match_report_id)
    """
    max_score = 0.0
    matching_id = ""

    for rep in existing_reports:
        # Distance check
        dist = haversine_distance(new_lat, new_lng, rep["latitude"], rep["longitude"])
        if dist > 15.0: # Outside 15 km
            continue

        # Time check
        time_diff_hours = abs((new_time - rep["timestamp"]).total_seconds()) / 3600.0
        if time_diff_hours > 4.0: # Outside 4 hour window
            continue

        sim = text_similarity(new_report_content, rep["content"])
        # Spatial factor (100% at 0km, 0% at 15km)
        spatial_factor = max(0.0, (15.0 - dist) / 15.0) * 100.0
        # Time factor (100% at 0hr, 0% at 4hr)
        time_factor = max(0.0, (4.0 - time_diff_hours) / 4.0) * 100.0

        combined_score = (sim * 0.5) + (spatial_factor * 0.3) + (time_factor * 0.2)
        if combined_score > max_score:
            max_score = combined_score
            matching_id = rep["id"]

    is_duplicate = max_score >= 70.0
    return round(max_score, 1), is_duplicate, matching_id
