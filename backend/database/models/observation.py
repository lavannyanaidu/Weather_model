from sqlalchemy import Column, String, Float, Boolean, DateTime, JSON, Text
from datetime import datetime
import uuid
from database.base import Base

class ObservationModel(Base):
    __tablename__ = "observations"

    observation_id = Column(String, primary_key=True, default=lambda: f"OBS-{uuid.uuid4().hex[:8].upper()}")
    source_id = Column(String, index=True)
    source_type = Column(String, index=True)  # social_media, citizen_report, weather_station, website, api
    source_url = Column(String, nullable=True)
    author_metadata = Column(JSON, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    ingested_at = Column(DateTime, default=datetime.utcnow)
    
    text = Column(Text, nullable=True)
    media_type = Column(String, default="text")  # text, image, video, ocr
    media_uri = Column(String, nullable=True)
    thumbnail_uri = Column(String, nullable=True)
    
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    location_text = Column(String, nullable=True)
    state = Column(String, index=True, nullable=True)
    district = Column(String, nullable=True)
    city = Column(String, index=True, nullable=True)
    
    language = Column(String, default="en")
    hashtags = Column(JSON, default=list)
    metadata_json = Column(JSON, default=dict)
    
    checksum = Column(String, nullable=True)
    content_hash = Column(String, index=True, nullable=True)
    
    # Redundancy Engine Attributes
    is_redundant = Column(Boolean, default=False, index=True)
    redundancy_group_id = Column(String, nullable=True, index=True)
    representative_observation_id = Column(String, nullable=True)
    similarity_score = Column(Float, nullable=True)
    
    verification_status = Column(String, default="Pending", index=True)  # Verified, Suspicious, Duplicate, Pending
    event_id = Column(String, nullable=True, index=True)
