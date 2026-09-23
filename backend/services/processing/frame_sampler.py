class FrameSampler:
    def sample_video_frames(self, video_uri: str, num_frames: int = 16) -> list:
        """
        Sample keyframes from video without processing every frame blindly.
        """
        frames = []
        for i in range(num_frames):
            frames.append({
                "frame_number": i * 5,
                "timestamp_sec": i * 1.5,
                "frame_uri": f"{video_uri}#frame={i*5}",
                "motion_score": round(0.4 + (i % 3) * 0.2, 2)
            })
        return frames
