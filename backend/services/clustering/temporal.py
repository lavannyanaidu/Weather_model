from datetime import datetime

def is_within_time_window(ts1: datetime, ts2: datetime, max_hours: float = 6.0) -> bool:
    """
    Check if two timestamps fall within maximum time difference threshold.
    """
    if not ts1 or not ts2:
        return False
    diff_seconds = abs((ts1 - ts2).total_seconds())
    return (diff_seconds / 3600.0) <= max_hours
