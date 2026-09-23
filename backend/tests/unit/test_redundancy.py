from services.intelligence.duplicate_detection import RedundancyEngine

def test_exact_hash_redundancy():
    engine = RedundancyEngine()
    current = {"text": "Severe waterlogging near Kukatpally main road"}
    existing = [{"observation_id": "OBS-001", "text": "Severe waterlogging near Kukatpally main road"}]
    
    res = engine.evaluate_redundancy(current, existing)
    assert res["is_redundant"] == True
    assert res["representative_observation_id"] == "OBS-001"

def test_unique_observation():
    engine = RedundancyEngine()
    current = {"text": "Sunny clear sky in Bengaluru today"}
    existing = [{"observation_id": "OBS-001", "text": "Severe waterlogging near Kukatpally main road"}]
    
    res = engine.evaluate_redundancy(current, existing)
    assert res["is_redundant"] == False
