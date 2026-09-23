import re
from typing import Dict, Tuple, Optional

# Pre-defined mapping of Indian major cities/locations with state and lat/lng
INDIAN_LOCATIONS = {
    "kukatpally": {"city": "Hyderabad", "state": "Telangana", "lat": 17.4948, "lng": 78.3996},
    "jntu": {"city": "Hyderabad", "state": "Telangana", "lat": 17.4981, "lng": 78.3915},
    "hitech city": {"city": "Hyderabad", "state": "Telangana", "lat": 17.4435, "lng": 78.3772},
    "hyderabad": {"city": "Hyderabad", "state": "Telangana", "lat": 17.3850, "lng": 78.4867},
    "secunderabad": {"city": "Hyderabad", "state": "Telangana", "lat": 17.4399, "lng": 78.4983},
    "bandra": {"city": "Mumbai", "state": "Maharashtra", "lat": 19.0596, "lng": 72.8295},
    "andheri": {"city": "Mumbai", "state": "Maharashtra", "lat": 19.1136, "lng": 72.8697},
    "mumbai": {"city": "Mumbai", "state": "Maharashtra", "lat": 19.0760, "lng": 72.8777},
    "connaught place": {"city": "Delhi", "state": "Delhi", "lat": 28.6315, "lng": 77.2167},
    "dwarka": {"city": "Delhi", "state": "Delhi", "lat": 28.5921, "lng": 77.0460},
    "delhi": {"city": "Delhi", "state": "Delhi", "lat": 28.6139, "lng": 77.2090},
    "t nagar": {"city": "Chennai", "state": "Tamil Nadu", "lat": 13.0418, "lng": 80.2341},
    "chennai": {"city": "Chennai", "state": "Tamil Nadu", "lat": 13.0827, "lng": 80.2707},
    "salt lake": {"city": "Kolkata", "state": "West Bengal", "lat": 22.5867, "lng": 88.4171},
    "kolkata": {"city": "Kolkata", "state": "West Bengal", "lat": 22.5726, "lng": 88.3639},
    "koramangala": {"city": "Bengaluru", "state": "Karnataka", "lat": 12.9352, "lng": 77.6245},
    "bengaluru": {"city": "Bengaluru", "state": "Karnataka", "lat": 12.9716, "lng": 77.5946},
    "bangalore": {"city": "Bengaluru", "state": "Karnataka", "lat": 12.9716, "lng": 77.5946},
    "guwahati": {"city": "Guwahati", "state": "Assam", "lat": 26.1445, "lng": 91.7362},
    "bhubaneswar": {"city": "Bhubaneswar", "state": "Odisha", "lat": 20.2961, "lng": 85.8245},
    "kochi": {"city": "Kochi", "state": "Kerala", "lat": 9.9312, "lng": 76.2673},
    "ahmedabad": {"city": "Ahmedabad", "state": "Gujarat", "lat": 23.0225, "lng": 72.5714}
}

def extract_location_from_text(content: str) -> Optional[Dict]:
    text = content.lower()
    for loc_key, details in INDIAN_LOCATIONS.items():
        if re.search(r'\b' + re.escape(loc_key) + r'\b', text):
            return details
    return None

def resolve_location(content: str, city: str = None, state: str = None, lat: float = None, lng: float = None) -> Tuple[str, str, float, float]:
    if lat is not None and lng is not None and city and state:
        return city, state, lat, lng
    
    extracted = extract_location_from_text(content)
    if extracted:
        return (
            city or extracted["city"],
            state or extracted["state"],
            lat if lat is not None else extracted["lat"],
            lng if lng is not None else extracted["lng"]
        )
    
    # Fallback to Hyderabad if completely missing
    return city or "Hyderabad", state or "Telangana", lat if lat is not None else 17.3850, lng if lng is not None else 78.4867
