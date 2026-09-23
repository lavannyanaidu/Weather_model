from fastapi import APIRouter

router = APIRouter(prefix="/system", tags=["System Health & AI Models"])

@router.get("/health")
def get_system_health():
    return {
        "status": "Healthy",
        "timestamp": "2026-09-23T23:45:00Z",
        "cpu_usage_pct": 28.4,
        "memory_usage_pct": 42.1,
        "throughput_per_sec": 4250,
        "processing_latency_ms": 14,
        "microservices": {
            "data_ingestion": "Healthy",
            "text_processing": "Healthy",
            "image_processing": "Healthy",
            "video_processing": "Healthy",
            "ocr_service": "Healthy",
            "ai_fusion": "Healthy",
            "deduplication": "Healthy",
            "event_fusion": "Healthy",
            "database": "Healthy",
            "map_service": "Healthy",
            "websocket_gateway": "Healthy",
            "api_gateway": "Healthy"
        }
    }

@router.get("/models")
def get_model_telemetry():
    return [
        {
            "name": "ModernBERT-Weather-v2",
            "type": "Text NLP Model",
            "purpose": "Weather event taxonomy, location extraction, and severity parsing",
            "accuracy": "96.4%",
            "latency": "18ms",
            "throughput": "2,400 docs/sec",
            "status": "Active"
        },
        {
            "name": "SigLIP 2 Zero-Shot",
            "type": "Image Visual Model",
            "purpose": "Zero-shot flood depth estimation, visual redundancy detection, storm cloud features",
            "accuracy": "94.8%",
            "latency": "45ms",
            "throughput": "680 imgs/sec",
            "status": "Active"
        },
        {
            "name": "VideoMAE V2",
            "type": "Video Action Model",
            "purpose": "Spatio-temporal video event classification and frame motion analysis",
            "accuracy": "91.2%",
            "latency": "110ms",
            "throughput": "120 vids/sec",
            "status": "Active"
        },
        {
            "name": "PaddleOCR-VL",
            "type": "Visual OCR Extraction",
            "purpose": "Extracted text detection, bounding box grounding, bulletin text parsing",
            "accuracy": "97.4%",
            "latency": "32ms",
            "throughput": "1,100 imgs/sec",
            "status": "Active"
        },
        {
            "name": "WeatherFusion-v4",
            "type": "Multimodal Fusion Engine",
            "purpose": "Cross-modal evidence correlation, explainable verification scoring, doppler radar ground truth matching",
            "accuracy": "96.1%",
            "latency": "12ms",
            "throughput": "4,500 fusions/sec",
            "status": "Active"
        }
    ]
