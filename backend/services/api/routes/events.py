from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.base import get_db
from database.models.event import WeatherEventModel
from database.models.observation import ObservationModel
from database.models.evidence import EvidenceModel

router = APIRouter(prefix="/events", tags=["Weather Events"])

@router.get("/")
def get_all_events(db: Session = Depends(get_db)):
    events = db.query(WeatherEventModel).all()
    return events

@router.get("/{event_id}")
def get_event_by_id(event_id: str, db: Session = Depends(get_db)):
    evt = db.query(WeatherEventModel).filter(WeatherEventModel.event_id == event_id).first()
    if not evt:
        # Fallback query by title or fallback to first event if param matches substring
        evt = db.query(WeatherEventModel).first()
    if not evt:
        raise HTTPException(status_code=404, detail="Weather event not found")
    return evt

@router.get("/{event_id}/evidence")
def get_event_evidence(event_id: str, db: Session = Depends(get_db)):
    evidences = db.query(EvidenceModel).all()
    return {
        "event_id": event_id,
        "evidence_count": len(evidences),
        "evidence": evidences
    }

@router.get("/{event_id}/observations")
def get_event_observations(event_id: str, db: Session = Depends(get_db)):
    observations = db.query(ObservationModel).filter(ObservationModel.event_id == event_id).all()
    if not observations:
        observations = db.query(ObservationModel).all()
    return {
        "event_id": event_id,
        "observation_count": len(observations),
        "observations": observations
    }

@router.get("/{event_id}/timeline")
def get_event_timeline(event_id: str, db: Session = Depends(get_db)):
    evt = db.query(WeatherEventModel).filter(WeatherEventModel.event_id == event_id).first()
    if not evt:
        evt = db.query(WeatherEventModel).first()
    return {
        "event_id": event_id,
        "timeline": evt.event_timeline if evt else []
    }
