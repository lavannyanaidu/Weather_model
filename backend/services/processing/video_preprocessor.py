from services.processing.frame_sampler import FrameSampler

class VideoPreprocessor:
    def __init__(self):
        self.frame_sampler = FrameSampler()

    def preprocess_video(self, video_uri: str) -> dict:
        sampled_frames = self.frame_sampler.sample_video_frames(video_uri, num_frames=16)
        return {
            "video_uri": video_uri,
            "duration_sec": 24.0,
            "fps": 30,
            "sampled_frames": sampled_frames,
            "motion_activity": "high_water_flow"
        }
