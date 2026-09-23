# National Weather Intelligence Platform - Backend & AI Architecture

Production-grade, modular, event-intelligence-centric backend system built for the **Ministry of Earth Sciences (MoES) / India Meteorological Department (IMD)**.

---

## Central Design Principle

```
RAW MULTIMODAL OBSERVATIONS
        ↓
AI FEATURE / EVIDENCE EXTRACTION
        ↓
SPATIOTEMPORAL CORRELATION
        ↓
EVIDENCE FUSION
        ↓
WEATHER EVENTS
        ↓
DECISION-SUPPORT APIs
```

- **`WeatherEvent` is the primary intelligence object.**
- Raw social media posts, citizen photos, videos, and station metrics are normalized as **`Observation`** and **`Evidence`** objects.
- **Redundancy filtering does NOT delete raw data.** It tags repeated observations with `is_redundant=True` and `redundancy_group_id` for complete auditability.

---

## Directory Architecture

```
backend/
├── services/
│   ├── api/                 # FastAPI REST routes, Pydantic schemas & WebSocket gateway
│   │   ├── main.py          # FastAPI application entrypoint
│   │   ├── config.py        # Central configuration settings
│   │   ├── routes/          # REST endpoints (events, observations, analytics, map, alerts, system)
│   │   └── websocket/       # Real-time WebSocket live updates (/ws/events)
│   ├── ingestion/           # Multi-source ingestion connectors & schema normalizer
│   │   ├── normalizer.py    # Standardized Observation schema builder
│   │   ├── kafka_producer.py# Kafka event stream producer
│   │   └── sources/         # Connectors (social, websites, apis, datasets, citizen reports)
│   ├── processing/          # Modality preprocessors & visual OCR service
│   │   ├── text_preprocessor.py
│   │   ├── image_preprocessor.py
│   │   ├── video_preprocessor.py
│   │   ├── frame_sampler.py # Video keyframe sampling
│   │   └── ocr.py           # PaddleOCR-VL bounding box text extraction
│   ├── models/              # Specialized AI modality models
│   │   ├── text/            # ModernBERT-Weather-v2 (Relevance, Taxonomy, Severity, Location NER)
│   │   ├── image/           # SigLIP 2 Zero-Shot (Standing water, visual attributes, depth)
│   │   ├── video/           # VideoMAE V2 (Temporal clip action, water movement)
│   │   └── fusion/          # WeatherFusion-v4 (Explainable evidence fusion engine)
│   ├── clustering/          # Spatiotemporal correlation
│   │   ├── spatial.py       # Haversine distance & PostGIS centroids
│   │   ├── temporal.py      # Time-window clustering
│   │   └── event_clustering.py # Candidate cluster engine
│   ├── intelligence/        # Primary intelligence synthesizers
│   │   ├── event_builder.py # WeatherEvent master dossier synthesizer
│   │   ├── duplicate_detection.py # Redundancy engine (hash & Jaccard)
│   │   └── source_reliability.py  # Explainable source reliability scorer
│   └── alerts/              # Threshold-driven alert generator
├── database/                # Database layer
│   ├── base.py              # SQLAlchemy engine & session factory
│   ├── models/              # Database entities (Observation, Evidence, Event, Alert, etc.)
│   └── seed/                # Realistic demo dataset seeder
├── training/                # AI model training, evaluation & splitting
│   └── splits/              # Event-level splitting to prevent data leakage
├── infrastructure/          # Containerization & config
│   ├── docker/
│   └── docker-compose.yml   # Postgres/PostGIS, Redis, Kafka, MinIO, MLflow, API
├── tests/                   # Test suite (unit, integration, pipeline)
├── configs/                 # Environment configs (development.yaml, staging.yaml, production.yaml)
└── requirements.txt
```

---

## Specialized AI Model Registry

| Model Name | Modality | Purpose / Task |
| :--- | :--- | :--- |
| **`ModernBERT-Weather-v2`** | Text NLP | Weather relevance, event taxonomy, severity parsing, location NER |
| **`SigLIP 2 Zero-Shot`** | Computer Vision | Zero-shot flood depth estimation, visual duplicate detection, cloud features |
| **`VideoMAE V2`** | Video Action | Spatio-temporal video event classification, frame keyframing, water movement |
| **`PaddleOCR-VL`** | Visual OCR | Bounding box text extraction, bulletin text parsing, text grounding |
| **`WeatherFusion-v4`** | Multimodal Fusion | Cross-modal evidence correlation, Doppler radar ground truth matching |

---

## API Endpoints

- `GET /api/v1/events` - Retrieve all fused master weather events
- `GET /api/v1/events/{event_id}` - Retrieve specific event intelligence dossier
- `GET /api/v1/events/{event_id}/evidence` - Retrieve supporting evidence items
- `GET /api/v1/events/{event_id}/observations` - Retrieve underlying raw/processed observations
- `GET /api/v1/events/{event_id}/timeline` - Retrieve event progression timeline
- `GET /api/v1/map/events` - GIS GeoJSON feature collection for National Map
- `GET /api/v1/analytics/overview` - Pan-India weather analytics summary
- `GET /api/v1/alerts` - Active operational alerts feed
- `GET /api/v1/system/health` - 12 microservices system telemetry
- `GET /api/v1/system/models` - AI model cards performance telemetry
- `WS /ws/events` - WebSocket live event update stream

---

## Local Setup & Quickstart

### 1. Requirements
- Python 3.10+
- Virtual environment (`venv`)

### 2. Installation & Test Suite Execution
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
pytest tests/ -v
```

### 3. Running the Server Locally
```bash
python services/api/main.py
```
The interactive OpenAPI docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).
