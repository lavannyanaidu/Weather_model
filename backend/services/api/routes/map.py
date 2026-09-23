from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.base import get_db
from database.models.event import WeatherEventModel

router = APIRouter(prefix="/map", tags=["GIS Map Overlays"])

@router.get("/events")
def get_map_events(db: Session = Depends(get_db)):
    events = db.query(WeatherEventModel).all()
    features = []
    for evt in events:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [evt.longitude, evt.latitude]
            },
            "properties": {
                "event_id": evt.event_id,
                "title": evt.title,
                "event_type": evt.event_type,
                "severity": evt.severity,
                "status": evt.status,
                "confidence": evt.confidence_score,
                "city": evt.city,
                "state": evt.state,
                "affected_radius_km": evt.affected_radius_km
            }
        })
    return {
        "type": "FeatureCollection",
        "features": features
    }
