class AlertRuleEngine:
    """
    Configurable alert rules.
    IF event_type == flooding AND severity == Critical AND confidence >= threshold -> Trigger Alert
    """
    def __init__(self, confidence_threshold: float = 0.85):
        self.confidence_threshold = confidence_threshold

    def should_trigger_alert(self, weather_event: dict) -> bool:
        severity = weather_event.get("severity")
        confidence = weather_event.get("confidence_score", 0.0)
        
        if severity in ["Critical", "High"] and confidence >= self.confidence_threshold:
            return True
        return False

    def generate_alert_payload(self, weather_event: dict) -> dict:
        return {
            "type": weather_event.get("severity", "Critical"),
            "event_id": weather_event.get("event_id"),
            "title": f"ALERT: {weather_event.get('title')}",
            "message": f"Critical weather alert in {weather_event.get('city')}, {weather_event.get('state')}. Corroborated with {weather_event.get('confidence_score')*100}% confidence.",
            "status": "Active",
            "location": f"{weather_event.get('city')}, {weather_event.get('state')}"
        }
