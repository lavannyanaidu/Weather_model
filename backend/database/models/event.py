from sqlalchemy import Column, String, Float, Integer, DateTime, JSON, Text
from datetime import datetime
import uuid
from database.base import Base

class WeatherEventModel(Base):
    __tablename__ = "weather_events"

    event_id = Column(String, primary_key=True, default=lambda: f"EVENT-HYD-{uuid.uuid4().hex[:4].upper()}")
    event_type = Column(String, index=True)  # flooding, heavy_rain, thunderstorm, heatwave, dust_storm, cyclone
    subtype = Column(String, nullable=True)
    severity = Column(String, index=True, default="Warning")  # Critical, High, Warning, Normal
    status = Column(String, index=True, default="CORROBORATED")  # DETECTED, CORROBORATING, CORROBORATED, ACTIVE, SUBSIDING, RESOLVED, REQUIRES_REVIEW
    
    confidence_score = Column(Float, default=0.85)
    confidence_components = Column(JSON, default=dict)
    
    title = Column(String)
    description = Column(Text, nullable=True)
    
    first_detected_at = Column(DateTime, default=datetime.utcnow, index=True)
    last_updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    city = Column(String, index=True)
    state = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    affected_radius_km = Column(Float, default=10.0)
    affected_geometry = Column(JSON, nullable=True)
    estimated_affected_area = Column(JSON, nullable=True)
    
    observation_count = Column(Integer, default=0)
    unique_source_count = Column(Integer, default=0)
    verified_observation_count = Column(Integer, default=0)
    flagged_observation_count = Column(Integer, default=0)
    redundant_observation_count = Column(Integer, default=0)
    
    rainfall_metrics = Column(JSON, default=dict)
    evidence_summary = Column(JSON, default=dict)
    event_timeline = Column(JSON, default=list)
    source_distribution = Column(JSON, default=dict)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
