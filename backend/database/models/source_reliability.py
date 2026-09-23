from sqlalchemy import Column, String, Float, Integer, DateTime, JSON
from datetime import datetime
from database.base import Base

class SourceReliabilityModel(Base):
    __tablename__ = "source_reliability"

    source_handle = Column(String, primary_key=True)
    source_name = Column(String)
    source_type = Column(String, index=True)
    
    historical_accuracy = Column(Float, default=85.0)
    verification_rate = Column(Float, default=80.0)
    duplicate_rate = Column(Float, default=10.0)
    location_accuracy = Column(Float, default=90.0)
    
    total_reports = Column(Integer, default=0)
    verified_count = Column(Integer, default=0)
    suspicious_count = Column(Integer, default=0)
    duplicate_count = Column(Integer, default=0)
    
    last_seen = Column(DateTime, default=datetime.utcnow)
    reliability_score = Column(Float, default=85.0)
    factors = Column(JSON, default=dict)
