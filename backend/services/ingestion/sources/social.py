from services.ingestion.normalizer import ObservationNormalizer

class SocialMediaConnector:
    def __init__(self):
        self.normalizer = ObservationNormalizer()

    def fetch_hashtag_posts(self, hashtag: str = "#IMD") -> list:
        posts = [
            {
                "source_id": "SRC-TW-01",
                "source_type": "social_media",
                "source_url": "https://twitter.com/weather_hyd/status/192039",
                "text": f"Continuous heavy rain in Hyderabad corridor. {hashtag} #HyderabadFloods",
                "media_type": "text",
                "latitude": 17.4948,
                "longitude": 78.3984,
                "city": "Hyderabad",
                "state": "Telangana",
                "hashtags": [hashtag, "#HyderabadFloods"]
            }
        ]
        return [self.normalizer.normalize(p) for p in posts]
