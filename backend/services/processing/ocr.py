class OcrService:
    def extract_text_from_media(self, media_uri: str) -> dict:
        """
        Visual OCR bounding box text extraction using PaddleOCR-VL model architecture.
        OCR text is treated as evidence, not absolute ground truth.
        """
        # Simulated robust OCR extraction with bounding box grounding
        return {
            "source_media_id": media_uri,
            "extracted_text": "IMD WEATHER BULLETIN: Flash flood warning for Kukatpally zone. 85mm rain recorded in 1 hour.",
            "confidence": 0.974,
            "bounding_boxes": [
                {"box": [12, 14, 240, 48], "text": "IMD WEATHER BULLETIN", "confidence": 0.99},
                {"box": [50, 14, 480, 80], "text": "Flash flood warning for Kukatpally zone", "confidence": 0.97},
                {"box": [85, 14, 320, 110], "text": "85mm rain recorded in 1 hour", "confidence": 0.96}
            ],
            "language": "en",
            "model_name": "PaddleOCR-VL"
        }
