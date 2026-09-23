from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.base import get_db
from database.models.alert import AlertModel
from database.models.source_reliability import SourceReliabilityModel

router = APIRouter(prefix="/alerts", tags=["Operational Alerts & Reliability"])

@router.get("/")
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(AlertModel).all()
    return alerts

@router.get("/sources")
def get_source_reliability(db: Session = Depends(get_db)):
    sources = db.query(SourceReliabilityModel).all()
    return sources
