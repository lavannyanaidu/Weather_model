from services.ingestion.normalizer import ObservationNormalizer

class CitizenReportConnector:
    def __init__(self):
        self.normalizer = ObservationNormalizer()

    def fetch_latest_reports(self) -> list:
        raw_reports = [
            {
                "source_id": "SRC-APP-02",
                "source_type": "citizen_report",
                "text": "Severe waterlogging near Kukatpally housing board colony. Water level up to 2 feet on main road.",
                "media_type": "image",
                "media_uri": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600",
                "latitude": 17.4948,
                "longitude": 78.3984,
                "city": "Hyderabad",
                "state": "Telangana"
            }
        ]
        return [self.normalizer.normalize(r) for r in raw_reports]
