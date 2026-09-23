from services.clustering.spatial import haversine_distance_km
from services.clustering.event_clustering import SpatiotemporalClusterEngine

def test_haversine_distance():
    # Kukatpally (17.4948, 78.3984) to Miyapur (17.4960, 78.3600) ~4 km
    dist = haversine_distance_km(17.4948, 78.3984, 17.4960, 78.3600)
    assert dist > 0.0
    assert dist < 10.0

def test_spatiotemporal_clustering():
    engine = SpatiotemporalClusterEngine(max_distance_km=15.0)
    obs_list = [
        {"latitude": 17.4948, "longitude": 78.3984, "event_type": "flooding"},
        {"latitude": 17.4960, "longitude": 78.3600, "event_type": "flooding"},
        {"latitude": 28.6139, "longitude": 77.2090, "event_type": "thunderstorm"}
    ]
    clusters = engine.cluster_observations(obs_list)
    assert len(clusters) == 2
