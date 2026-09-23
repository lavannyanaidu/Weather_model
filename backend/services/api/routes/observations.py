from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database.base import get_db
from database.models.observation import ObservationModel
from services.intelligence.duplicate_detection import RedundancyEngine

router = APIRouter(prefix="/observations", tags=["Raw & Processed Observations"])
redundancy_engine = RedundancyEngine()

@router.get("/")
def get_observations(
    limit: int = 50,
    status: str = None,
    city: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(ObservationModel)
    if status:
        query = query.filter(ObservationModel.verification_status == status)
    if city:
        query = query.filter(ObservationModel.city == city)
    return query.limit(limit).all()

@router.get("/{observation_id}")
def get_observation_detail(observation_id: str, db: Session = Depends(get_db)):
    obs = db.query(ObservationModel).filter(ObservationModel.observation_id == observation_id).first()
    if not obs:
        raise HTTPException(status_code=404, detail="Observation not found")
    return obs

@router.post("/ingest")
def ingest_raw_observation(payload: dict, db: Session = Depends(get_db)):
    existing = db.query(ObservationModel).all()
    existing_dicts = [{"text": o.text, "observation_id": o.observation_id} for o in existing]
    
    red_eval = redundancy_engine.evaluate_redundancy(payload, existing_dicts)
    
    obs = ObservationModel(
        source_id=payload.get("source_id", "SRC-USER-01"),
        source_type=payload.get("source_type", "citizen_report"),
        source_url=payload.get("source_url"),
        text=payload.get("text", "Simulated heavy rain report"),
        media_type=payload.get("media_type", "text"),
        media_uri=payload.get("media_uri"),
        latitude=payload.get("latitude", 17.4948),
        longitude=payload.get("longitude", 78.3984),
        location_text=payload.get("location_text", "Hyderabad"),
        state=payload.get("state", "Telangana"),
        city=payload.get("city", "Hyderabad"),
        is_redundant=red_eval["is_redundant"],
        redundancy_group_id=red_eval["redundancy_group_id"],
        representative_observation_id=red_eval["representative_observation_id"],
        similarity_score=red_eval["similarity_score"]
    )
    db.add(obs)
    db.commit()
    db.refresh(obs)
    return {
        "status": "INGESTED",
        "observation": obs,
        "redundancy_evaluation": red_eval
    }
