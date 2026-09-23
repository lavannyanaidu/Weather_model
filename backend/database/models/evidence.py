from sqlalchemy import Column, String, Float, DateTime, JSON
from datetime import datetime
import uuid
from database.base import Base

class EvidenceModel(Base):
    __tablename__ = "evidences"

    evidence_id = Column(String, primary_key=True, default=lambda: f"EVD-{uuid.uuid4().hex[:8].upper()}")
    observation_id = Column(String, index=True)
    modality = Column(String, index=True)  # text, image, video, ocr, weather
    
    event_type = Column(String, index=True)  # flooding, heavy_rain, thunderstorm, heatwave, cyclone, landslide, etc.
    location = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    severity = Column(String, default="Normal")  # Critical, High, Warning, Normal
    confidence = Column(Float, default=0.0)
    features = Column(JSON, default=dict)
    embedding_uri = Column(String, nullable=True)
    
    model_name = Column(String, index=True)  # ModernBERT-Weather-v2, SigLIP 2 Zero-Shot, VideoMAE V2, PaddleOCR-VL
    model_version = Column(String, default="1.0.0")
    created_at = Column(DateTime, default=datetime.utcnow)
