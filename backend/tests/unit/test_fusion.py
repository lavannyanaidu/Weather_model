from services.models.fusion.feature_fusion import FeatureFusionEngine

def test_multimodal_evidence_fusion():
    engine = FeatureFusionEngine()
    res = engine.compute_fusion_score(
        text_support=0.95,
        image_support=0.96,
        video_support=0.92,
        ocr_support=0.94,
        spatial_consistency=0.98,
        temporal_consistency=0.95,
        source_reliability=0.90,
        weather_corroboration=0.99
    )
    assert res["confidence_score"] > 0.90
    assert "text_support" in res["confidence_components"]
    assert res["model_name"] == "WeatherFusion-v4"
