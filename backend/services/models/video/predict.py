from services.models.video.model import VideoMaeV2Classifier

_video_model_instance = VideoMaeV2Classifier()

def predict_video_evidence(video_uri: str, sampled_frames: list = None) -> dict:
    return _video_model_instance.predict(video_uri, sampled_frames)
