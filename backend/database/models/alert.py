from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid
from database.base import Base

class AlertModel(Base):
    __tablename__ = "alerts"

    alert_id = Column(String, primary_key=True, default=lambda: f"ALT-{uuid.uuid4().hex[:6].upper()}")
    event_id = Column(String, index=True, nullable=True)
    report_id = Column(String, index=True, nullable=True)
    
    type = Column(String, index=True)  # Critical, Warning, System, AI
    title = Column(String)
    message = Column(String)
    status = Column(String, default="Active", index=True)  # Active, Acknowledged, Escalated
    location = Column(String, nullable=True)
    
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
