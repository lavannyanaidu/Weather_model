from typing import Tuple, Dict

EVENT_KEYWORDS = {
    "Flooding": ["flood", "waterlogging", "water logging", "inundation", "submerged", "overflow", "submergence", "inundated"],
    "Heavy Rain": ["heavy rain", "downpour", "torrential", "heavy rainfall", "monsoon lash", "cloudburst", "pouring"],
    "Thunderstorm": ["thunderstorm", "lightning", "thunder", "squall", "cloud strike", "tempest"],
    "Heatwave": ["heatwave", "extreme heat", "scorching", "sunstroke", "high temperature", "heat wave"],
    "Fog": ["fog", "dense fog", "smog", "zero visibility", "mist"],
    "Dust Storm": ["dust storm", "andhi", "sandstorm", "dust gale"],
    "Strong Wind": ["strong wind", "gale", "cyclonic wind", "gusty winds", "windstorm", "uprooted trees"]
}

def classify_weather_event(content: str) -> Tuple[str, float]:
    """
    Returns (event_type, confidence_score) based on transparent keyword matching and pattern scoring.
    """
    text = content.lower()
    scores: Dict[str, int] = {cat: 0 for cat in EVENT_KEYWORDS}

    for cat, keywords in EVENT_KEYWORDS.items():
        for kw in keywords:
            if kw in text:
                scores[cat] += 2

    # Find highest scoring category
    best_category = max(scores, key=scores.get)
    best_score = scores[best_category]

    if best_score == 0:
        # Fallback keyword matching
        if "rain" in text:
            return "Heavy Rain", 65.0
        return "Heavy Rain", 50.0

    confidence = min(98.0, 70.0 + (best_score * 7.5))
    return best_category, confidence
