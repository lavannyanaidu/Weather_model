import pytest
from services.api.main import app

def test_root_endpoint():
    from services.api.main import root
    res = root()
    assert res["status"] == "Online"

def test_events_endpoint():
    from database.base import SessionLocal
    from database.seed.seed_data import seed_database
    from services.api.routes.events import get_all_events
    
    db = SessionLocal()
    try:
        seed_database(db)
        events = get_all_events(db)
        assert len(events) > 0
    finally:
        db.close()

def test_system_health_endpoint():
    from services.api.routes.system import get_system_health
    res = get_system_health()
    assert res["status"] == "Healthy"

def test_system_models_endpoint():
    from services.api.routes.system import get_model_telemetry
    res = get_model_telemetry()
    assert len(res) == 5
