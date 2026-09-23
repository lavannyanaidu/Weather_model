import hashlib
from datetime import datetime

class ObservationNormalizer:
    """
    Normalizes all multi-source ingestion channels (social media, websites, public APIs,
    datasets, citizen reports, weather stations, radar) into a single unified Observation schema.
    """
    def normalize(self, raw_data: dict) -> dict:
        text = raw_data.get("text") or raw_data.get("content") or ""
        content_hash = hashlib.md5(text.strip().lower().encode("utf-8")).hexdigest() if text else ""

        return {
            "source_id": raw_data.get("source_id", "SRC-GENERIC"),
            "source_type": raw_data.get("source_type", "citizen_report"),
            "source_url": raw_data.get("source_url"),
            "author_metadata": raw_data.get("author", {}),
            "created_at": raw_data.get("created_at") or datetime.utcnow().isoformat(),
            "ingested_at": datetime.utcnow().isoformat(),
            "text": text,
            "media_type": raw_data.get("media_type", "text"),
            "media_uri": raw_data.get("media_uri"),
            "thumbnail_uri": raw_data.get("thumbnail_uri"),
            "latitude": raw_data.get("latitude") or raw_data.get("lat"),
            "longitude": raw_data.get("longitude") or raw_data.get("lng"),
            "location_text": raw_data.get("location_text") or raw_data.get("city"),
            "state": raw_data.get("state"),
            "district": raw_data.get("district"),
            "city": raw_data.get("city"),
            "language": raw_data.get("language", "en"),
            "hashtags": raw_data.get("hashtags", []),
            "metadata_json": raw_data.get("metadata", {}),
            "checksum": raw_data.get("checksum"),
            "content_hash": content_hash
        }
