from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Source(Base):
    __tablename__ = "sources"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False) # Social Media, Public APIs, Websites, Public Datasets, Citizen Reports, Government Weather Data
    status = Column(String, default="Active") # Active, Degraded, Offline
    last_ingestion = Column(DateTime, default=datetime.utcnow)
    records_ingested = Column(Integer, default=0)
    error_count = Column(Integer, default=0)

    reports = relationship("Report", back_populates="source_rel")

class EventReport(Base):
    __tablename__ = "event_reports"

    event_id = Column(String, ForeignKey("events.id"), primary_key=True)
    report_id = Column(String, ForeignKey("reports.id"), primary_key=True)

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, index=True)
    source_id = Column(String, ForeignKey("sources.id"), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    content = Column(Text, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    media_url = Column(String, nullable=True)
    verification_status = Column(String, default="Pending") # Verified, Pending, Suspicious, Rejected
    reliability_score = Column(Float, default=50.0) # 0 to 100
    duplicate_score = Column(Float, default=0.0) # 0 to 100
    is_duplicate = Column(Boolean, default=False)
    reasons_json = Column(Text, nullable=True) # JSON list of explainability points
    created_at = Column(DateTime, default=datetime.utcnow)

    source_rel = relationship("Source", back_populates="reports")
    events = relationship("Event", secondary="event_reports", back_populates="reports")

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    severity = Column(String, default="Moderate") # Extreme, High, Moderate, Low
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    confidence = Column(Float, default=70.0)
    status = Column(String, default="Active") # Active, Monitoring, Resolved
    first_detected = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow)
    formation_steps_json = Column(Text, nullable=True) # Pipeline fusion steps

    reports = relationship("Report", secondary="event_reports", back_populates="events")

class VerificationAction(Base):
    __tablename__ = "verification_actions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    report_id = Column(String, ForeignKey("reports.id"), nullable=False)
    action = Column(String, nullable=False)
    actor = Column(String, default="Admin Operator")
    timestamp = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)
