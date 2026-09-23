import os
try:
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        from pydantic.v1 import BaseSettings
    except ImportError:
        from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "National Weather Big Data Analytics Platform"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./weather_intelligence.db")
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", 6379))
    
    SECRET_KEY: str = "supersecretkey-for-national-weather-platform"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

settings = Settings()
