from services.ingestion.normalizer import ObservationNormalizer

def test_observation_normalization():
    normalizer = ObservationNormalizer()
    raw = {
        "source_id": "SRC-TEST-01",
        "source_type": "citizen_report",
        "text": "Severe waterlogging near Kukatpally main road #IMD",
        "latitude": 17.49,
        "longitude": 78.39,
        "city": "Hyderabad"
    }
    normalized = normalizer.normalize(raw)
    assert normalized["source_id"] == "SRC-TEST-01"
    assert normalized["city"] == "Hyderabad"
    assert len(normalized["content_hash"]) > 0
