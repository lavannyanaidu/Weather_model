from sqlalchemy import Column, String, Float, DateTime
from datetime import datetime
import uuid
from database.base import Base

class WeatherMeasurementModel(Base):
    __tablename__ = "weather_measurements"

    measurement_id = Column(String, primary_key=True, default=lambda: f"WX-{uuid.uuid4().hex[:8].upper()}")
    station_id = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    latitude = Column(Float)
    longitude = Column(Float)
    
    rainfall_1h = Column(Float, default=0.0)
    rainfall_3h = Column(Float, default=0.0)
    rainfall_6h = Column(Float, default=0.0)
    rainfall_12h = Column(Float, default=0.0)
    rainfall_24h = Column(Float, default=0.0)
    
    temperature = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    wind_speed = Column(Float, nullable=True)
    wind_direction = Column(Float, nullable=True)
    pressure = Column(Float, nullable=True)
