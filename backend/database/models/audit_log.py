from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid
from database.base import Base

class AuditLogModel(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: f"LOG-{uuid.uuid4().hex[:6].upper()}")
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    actor = Column(String)
    role = Column(String)
    action = Column(String, index=True)
    target = Column(String)
    result = Column(String)
    severity = Column(String, default="info")  # info, warning, critical
