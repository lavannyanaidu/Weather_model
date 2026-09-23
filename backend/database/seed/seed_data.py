from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random

from database.models.observation import ObservationModel
from database.models.evidence import EvidenceModel
from database.models.event import WeatherEventModel
from database.models.source_reliability import SourceReliabilityModel
from database.models.alert import AlertModel
from database.models.audit_log import AuditLogModel

def seed_database(db: Session):
    # Check if events already seeded
    if db.query(WeatherEventModel).first():
        return

    # Seed 5 Master Weather Events
    events_data = [
        {
            "event_id": "EVENT-HYD-001",
            "event_type": "flooding",
            "subtype": "urban_inundation",
            "title": "Urban Flooding & Severe Waterlogging",
            "description": "Extreme localized cloudburst causing severe urban inundation across Kukatpally, Miyapur, and Cyberabad Tech Corridor.",
            "severity": "Critical",
            "status": "ACTIVE",
            "confidence_score": 0.96,
            "confidence_components": {"text": 0.95, "image": 0.97, "video": 0.94, "radar": 0.98},
            "city": "Hyderabad",
            "state": "Telangana",
            "latitude": 17.4948,
            "longitude": 78.3984,
            "affected_radius_km": 12.5,
            "estimated_affected_area": {"sq_km": 145, "type": "observed_footprint"},
            "observation_count": 143,
            "unique_source_count": 34,
            "verified_observation_count": 118,
            "flagged_observation_count": 5,
            "redundant_observation_count": 20,
            "rainfall_metrics": {"intensity_mm_hr": 84.5, "accumulated_24h_mm": 198.2},
            "evidence_summary": {"text": 85, "image": 42, "video": 16},
            "event_timeline": [
                {"time": "03:45 AM", "title": "Cloudburst Warning Triggered", "desc": "Doppler Radar network detected intense convective cell (>55 dBZ)."},
                {"time": "04:15 AM", "title": "Multi-source Citizen Verification", "desc": "118 corroborating citizen report packets & geotagged photos received."},
                {"time": "04:30 AM", "title": "Redundancy Filter Applied", "desc": "20 near-duplicate social media reports grouped into master cluster."}
            ],
            "source_distribution": {"Citizen Mobile App": 45, "Twitter/X": 35, "NDRF Feeds": 15, "IMD Weather Stations": 5}
        },
        {
            "event_id": "EVENT-MUM-002",
            "event_type": "heavy_rain",
            "subtype": "monsoon_downpour",
            "title": "Severe Coastal Downpour & High Tide Alert",
            "description": "Continuous high-intensity rainfall coinciding with 4.2m high sea tide leading to coastal drainage congestion.",
            "severity": "Critical",
            "status": "ACTIVE",
            "confidence_score": 0.94,
            "confidence_components": {"text": 0.92, "image": 0.95, "video": 0.93, "radar": 0.96},
            "city": "Mumbai",
            "state": "Maharashtra",
            "latitude": 19.0760,
            "longitude": 72.8777,
            "affected_radius_km": 24.0,
            "estimated_affected_area": {"sq_km": 280, "type": "observed_footprint"},
            "observation_count": 312,
            "unique_source_count": 68,
            "verified_observation_count": 275,
            "flagged_observation_count": 8,
            "redundant_observation_count": 29,
            "rainfall_metrics": {"intensity_mm_hr": 112.0, "accumulated_24h_mm": 310.5},
            "evidence_summary": {"text": 180, "image": 95, "video": 37},
            "event_timeline": [
                {"time": "02:00 AM", "title": "High Tide Warning", "desc": "IMD Mumbai issued Red Alert for Coastal Zone."},
                {"time": "03:30 AM", "title": "Railway Track Inundation", "desc": "SigLIP 2 visual analysis verified water levels at Kurla station."}
            ],
            "source_distribution": {"Twitter/X": 50, "Citizen Mobile App": 30, "Public Datasets": 15, "IMD Weather Stations": 5}
        },
        {
            "event_id": "EVENT-DEL-003",
            "event_type": "thunderstorm",
            "subtype": "squall_winds",
            "title": "Severe Squall & Severe Thunderstorm",
            "description": "High velocity wind squall (75 km/h) accompanied by sudden hail and heavy cloud discharge.",
            "severity": "High",
            "status": "CORROBORATED",
            "confidence_score": 0.91,
            "confidence_components": {"text": 0.90, "image": 0.92, "video": 0.89, "radar": 0.93},
            "city": "New Delhi",
            "state": "Delhi",
            "latitude": 28.6139,
            "longitude": 77.2090,
            "affected_radius_km": 18.0,
            "estimated_affected_area": {"sq_km": 210, "type": "observed_footprint"},
            "observation_count": 94,
            "unique_source_count": 22,
            "verified_observation_count": 82,
            "flagged_observation_count": 3,
            "redundant_observation_count": 9,
            "rainfall_metrics": {"intensity_mm_hr": 45.0, "accumulated_24h_mm": 62.0},
            "evidence_summary": {"text": 60, "image": 24, "video": 10},
            "event_timeline": [
                {"time": "05:10 AM", "title": "Squall Cell Formation", "desc": "Doppler Radar detected gust front advancing from Rohtak."}
            ],
            "source_distribution": {"Twitter/X": 60, "Citizen Mobile App": 25, "Websites": 15}
        },
        {
            "event_id": "EVENT-BLR-004",
            "event_type": "flooding",
            "subtype": "lake_overflow",
            "title": "Bellandur Lake Overflow & Drainage Backflow",
            "description": "Heavy overnight rains causing arterial storm drain backflow in Outer Ring Road tech corridor.",
            "severity": "Warning",
            "status": "ACTIVE",
            "confidence_score": 0.88,
            "confidence_components": {"text": 0.87, "image": 0.89, "video": 0.86, "radar": 0.90},
            "city": "Bengaluru",
            "state": "Karnataka",
            "latitude": 12.9352,
            "longitude": 77.6245,
            "affected_radius_km": 8.0,
            "estimated_affected_area": {"sq_km": 65, "type": "observed_footprint"},
            "observation_count": 68,
            "unique_source_count": 19,
            "verified_observation_count": 58,
            "flagged_observation_count": 2,
            "redundant_observation_count": 8,
            "rainfall_metrics": {"intensity_mm_hr": 38.0, "accumulated_24h_mm": 88.0},
            "evidence_summary": {"text": 40, "image": 20, "video": 8},
            "event_timeline": [
                {"time": "04:00 AM", "title": "Lake Level Threshold Exceeded", "desc": "Sensors triggered warning status."}
            ],
            "source_distribution": {"Citizen Mobile App": 50, "Twitter/X": 35, "APIs": 15}
        },
        {
            "event_id": "EVENT-GHY-005",
            "event_type": "landslide",
            "subtype": "hillside_erosion",
            "title": "Hillside Soil Erosion & Landslide Hazard",
            "description": "Continuous 48-hour torrential rain triggering mudslides along Kamakhya hill slopes.",
            "severity": "Critical",
            "status": "ACTIVE",
            "confidence_score": 0.95,
            "confidence_components": {"text": 0.94, "image": 0.96, "video": 0.95, "radar": 0.95},
            "city": "Guwahati",
            "state": "Assam",
            "latitude": 26.1445,
            "longitude": 91.7362,
            "affected_radius_km": 6.5,
            "estimated_affected_area": {"sq_km": 42, "type": "observed_footprint"},
            "observation_count": 52,
            "unique_source_count": 14,
            "verified_observation_count": 48,
            "flagged_observation_count": 1,
            "redundant_observation_count": 3,
            "rainfall_metrics": {"intensity_mm_hr": 62.0, "accumulated_24h_mm": 240.0},
            "evidence_summary": {"text": 30, "image": 16, "video": 6},
            "event_timeline": [
                {"time": "01:15 AM", "title": "Landslide Hazard Warning", "desc": "State Disaster Response Force deployed to hill zone."}
            ],
            "source_distribution": {"SDRF Feeds": 60, "Citizen Mobile App": 25, "Twitter/X": 15}
        }
    ]

    for item in events_data:
        evt = WeatherEventModel(**item)
        db.add(evt)

    # Seed Sample Observations
    sample_obs = [
        {
            "observation_id": "OBS-2026-09124",
            "source_id": "SRC-TW-01",
            "source_type": "social_media",
            "source_url": "https://twitter.com/weather_hyd/status/192039",
            "text": "Severe waterlogging near Kukatpally housing board colony. Water level up to 2 feet on main road. #IMD #HyderabadFloods",
            "media_type": "image",
            "media_uri": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop",
            "latitude": 17.4948,
            "longitude": 78.3984,
            "location_text": "Kukatpally, Hyderabad",
            "state": "Telangana",
            "city": "Hyderabad",
            "verification_status": "Verified",
            "event_id": "EVENT-HYD-001"
        },
        {
            "observation_id": "OBS-2026-09125",
            "source_id": "SRC-APP-02",
            "source_type": "citizen_report",
            "text": "High speed winds and heavy rainfall breaking tree branches near Miyapur metro station. Avoid route.",
            "media_type": "video",
            "media_uri": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop",
            "latitude": 17.4960,
            "longitude": 78.3600,
            "location_text": "Miyapur, Hyderabad",
            "state": "Telangana",
            "city": "Hyderabad",
            "verification_status": "Verified",
            "event_id": "EVENT-HYD-001"
        },
        {
            "observation_id": "OBS-2026-09126",
            "source_id": "SRC-TW-01",
            "source_type": "social_media",
            "text": "Heavy rain flooded roads in Kurla West near station. Trains running slow.",
            "media_type": "image",
            "media_uri": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop",
            "latitude": 19.0657,
            "longitude": 72.8790,
            "location_text": "Kurla, Mumbai",
            "state": "Maharashtra",
            "city": "Mumbai",
            "verification_status": "Verified",
            "event_id": "EVENT-MUM-002"
        }
    ]

    for obs in sample_obs:
        db.add(ObservationModel(**obs))

    # Seed Source Reliability Data
    sources_data = [
        {
            "source_handle": "@IMD_WeatherNews",
            "source_name": "Official IMD Twitter Stream",
            "source_type": "Verified Agency",
            "reliability_score": 98.5,
            "total_reports": 1420,
            "verified_count": 1395,
            "suspicious_count": 5,
            "duplicate_count": 20,
            "factors": {"historicalVerification": 99, "locationConsistency": 98, "crossSourceAgreement": 98}
        },
        {
            "source_handle": "CitizenApp_Verifed_Feed",
            "source_name": "MoES Mobile Crowdsource",
            "source_type": "Citizen Application",
            "reliability_score": 91.2,
            "total_reports": 8450,
            "verified_count": 7680,
            "suspicious_count": 210,
            "duplicate_count": 560,
            "factors": {"historicalVerification": 92, "locationConsistency": 94, "crossSourceAgreement": 88}
        },
        {
            "source_handle": "@HyderabadCityTraffic",
            "source_name": "Traffic Police Control Room",
            "source_type": "Municipal Government",
            "reliability_score": 95.8,
            "total_reports": 890,
            "verified_count": 860,
            "suspicious_count": 8,
            "duplicate_count": 22,
            "factors": {"historicalVerification": 97, "locationConsistency": 98, "crossSourceAgreement": 93}
        }
    ]

    for sr in sources_data:
        db.add(SourceReliabilityModel(**sr))

    # Seed Alerts
    alerts_data = [
        {
            "alert_id": "ALT-1092",
            "event_id": "EVENT-HYD-001",
            "type": "Critical",
            "title": "Cloudburst & Urban Flood Emergency",
            "message": "Localized rainfall >80mm/hr detected in Kukatpally zone. Immediate disaster response alerted.",
            "status": "Active",
            "location": "Kukatpally, Hyderabad"
        },
        {
            "alert_id": "ALT-1093",
            "event_id": "EVENT-MUM-002",
            "type": "Critical",
            "title": "High Tide & Coastal Inundation",
            "message": "Continuous heavy downpour coinciding with 4.2m sea tide. Red alert active.",
            "status": "Active",
            "location": "Mumbai Coastal Belt"
        }
    ]

    for alt in alerts_data:
        db.add(AlertModel(**alt))

    # Seed Audit Log
    db.add(AuditLogModel(
        actor="Dr. Rajesh Sharma",
        role="Chief Operational Meteorologist",
        action="EVENT_CORROBORATION",
        target="EVENT-HYD-001",
        result="Corroborated Kukatpally flood event via 118 verified observations and radar ground truth",
        severity="critical"
    ))

    db.commit()
