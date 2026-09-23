import random

def create_event_level_split(observations: list, train_ratio: float = 0.7, val_ratio: float = 0.15, test_ratio: float = 0.15) -> dict:
    """
    Groups observations by event_id / event_cluster before splitting.
    Guarantees that observations from the same real-world event do NOT bleed between train, validation, and test splits.
    """
    event_groups = {}
    for obs in observations:
        evt_id = obs.get("event_id") or "UNASSIGNED"
        if evt_id not in event_groups:
            event_groups[evt_id] = []
        event_groups[evt_id].append(obs)

    event_ids = list(event_groups.keys())
    random.shuffle(event_ids)

    n_total = len(event_ids)
    n_train = int(n_total * train_ratio)
    n_val = int(n_total * val_ratio)

    train_events = event_ids[:n_train]
    val_events = event_ids[n_train:n_train + n_val]
    test_events = event_ids[n_train + n_val:]

    train_obs = [obs for e in train_events for obs in event_groups[e]]
    val_obs = [obs for e in val_events for obs in event_groups[e]]
    test_obs = [obs for e in test_events for obs in event_groups[e]]

    return {
        "train_events": train_events,
        "val_events": val_events,
        "test_events": test_events,
        "train_count": len(train_obs),
        "val_count": len(val_obs),
        "test_count": len(test_obs),
        "train_observations": train_obs,
        "val_observations": val_obs,
        "test_observations": test_obs
    }
