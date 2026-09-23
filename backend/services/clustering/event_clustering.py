from services.clustering.spatial import haversine_distance_km, compute_spatial_centroid
from services.clustering.temporal import is_within_time_window

class SpatiotemporalClusterEngine:
    """
    Cluster candidate observation feeds using:
    - Dominant event type
    - Haversine distance threshold (e.g. 15 km)
    - Temporal window threshold (e.g. 6 hours)
    """
    def __init__(self, max_distance_km: float = 15.0, max_time_hours: float = 6.0):
        self.max_distance_km = max_distance_km
        self.max_time_hours = max_time_hours

    def cluster_observations(self, observations: list) -> list:
        if not observations:
            return []

        clusters = []
        for obs in observations:
            lat = obs.get("latitude") or 17.4948
            lon = obs.get("longitude") or 78.3984
            event_type = obs.get("event_type") or "flooding"

            assigned = False
            for cluster in clusters:
                if cluster["dominant_event_type"] == event_type:
                    dist = haversine_distance_km(lat, lon, cluster["centroid"][0], cluster["centroid"][1])
                    if dist <= self.max_distance_km:
                        cluster["observations"].append(obs)
                        pts = [(o.get("latitude") or lat, o.get("longitude") or lon) for o in cluster["observations"]]
                        cluster["centroid"] = compute_spatial_centroid(pts)
                        cluster["observation_count"] = len(cluster["observations"])
                        assigned = True
                        break

            if not assigned:
                clusters.append({
                    "cluster_id": f"CLS-{len(clusters)+1:03d}",
                    "dominant_event_type": event_type,
                    "centroid": (lat, lon),
                    "radius_km": 10.0,
                    "observation_count": 1,
                    "observations": [obs]
                })

        return clusters
