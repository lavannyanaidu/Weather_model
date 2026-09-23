from services.models.image.model import SigLip2WeatherClassifier

_image_model_instance = SigLip2WeatherClassifier()

def predict_image_evidence(media_uri: str) -> dict:
    return _image_model_instance.predict(media_uri)
