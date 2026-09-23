from services.models.text.model import ModernBertWeatherClassifier

_text_model_instance = ModernBertWeatherClassifier()

def predict_text_evidence(text: str) -> dict:
    return _text_model_instance.predict(text)
