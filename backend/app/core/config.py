import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

try:
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        from pydantic import BaseSettings
    except ImportError:
        class BaseSettings:
            pass

class Settings(BaseSettings):
    PROJECT_NAME: str = "National Weather Big Data Analytics Platform (MoES)"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sih_weather.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "sih-2026-weather-intelligence-key-secret")

settings = Settings()

