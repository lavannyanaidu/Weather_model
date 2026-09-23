class FeatureFusionEngine:
    """
    WeatherFusion-v4 Multimodal Evidence Fusion Engine
    Synthesizes text, image, video, OCR, location consistency, source reliability, and Doppler radar corroboration into a unified confidence score.
    """
    def __init__(self):
        self.model_name = "WeatherFusion-v4"
        self.version = "4.2.0"

    def compute_fusion_score(
        self,
        text_support: float = 0.0,
        image_support: float = 0.0,
        video_support: float = 0.0,
        ocr_support: float = 0.0,
        spatial_consistency: float = 0.90,
        temporal_consistency: float = 0.92,
        source_reliability: float = 0.88,
        weather_corroboration: float = 0.95,
        redundancy_penalty: float = 0.02
    ) -> dict:
        """
        Explainable weighted evidence fusion calculation.
        """
        w_text = 0.20
        w_image = 0.20
        w_video = 0.15
        w_ocr = 0.10
        w_spatial = 0.10
        w_temporal = 0.10
        w_source = 0.05
        w_radar = 0.10

        weighted_score = (
            (text_support * w_text) +
            (image_support * w_image) +
            (video_support * w_video) +
            (ocr_support * w_ocr) +
            (spatial_consistency * w_spatial) +
            (temporal_consistency * w_temporal) +
            (source_reliability * w_source) +
            (weather_corroboration * w_radar)
        ) - redundancy_penalty

        # Clamp between 0.0 and 0.99
        final_score = round(max(0.0, min(0.99, weighted_score)), 3)

        return {
            "confidence_score": final_score,
            "confidence_components": {
                "text_support": round(text_support, 3),
                "image_support": round(image_support, 3),
                "video_support": round(video_support, 3),
                "ocr_support": round(ocr_support, 3),
                "spatial_consistency": round(spatial_consistency, 3),
                "temporal_consistency": round(temporal_consistency, 3),
                "source_reliability": round(source_reliability, 3),
                "weather_corroboration": round(weather_corroboration, 3),
                "redundancy_penalty": round(redundancy_penalty, 3)
            },
            "model_name": self.model_name,
            "model_version": self.version
        }
