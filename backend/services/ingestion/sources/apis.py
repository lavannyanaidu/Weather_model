from services.ingestion.normalizer import ObservationNormalizer

class PublicApiConnector:
    def __init__(self):
        self.normalizer = ObservationNormalizer()

    def fetch_weather_api_feeds(self) -> list:
        raw_feeds = [
            {
                "source_id": "SRC-API-05",
                "source_type": "api",
                "text": "IMD Radar API Feed: High reflectivity convective cell (>55 dBZ) over Hyderabad metropolitan area.",
                "media_type": "text",
                "latitude": 17.4948,
                "longitude": 78.3984,
                "city": "Hyderabad",
                "state": "Telangana"
            }
        ]
        return [self.normalizer.normalize(f) for f in raw_feeds]
