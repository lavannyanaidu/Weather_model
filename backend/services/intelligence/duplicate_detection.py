import hashlib

class RedundancyEngine:
    """
    Redundancy Filtering Engine
    Identifies near-duplicates, repeated reports, and spatiotemporally correlated observations.
    Raw observations are marked with is_redundant and redundancy_group_id without being deleted.
    """
    def compute_content_hash(self, text: str) -> str:
        if not text:
            return ""
        return hashlib.md5(text.strip().lower().encode('utf-8')).hexdigest()

    def evaluate_redundancy(self, current_obs: dict, existing_observations: list) -> dict:
        curr_text = (current_obs.get("text") or "").strip().lower()
        curr_hash = self.compute_content_hash(curr_text)
        
        for obs in existing_observations:
            other_text = (obs.get("text") or "").strip().lower()
            other_hash = self.compute_content_hash(other_text)

            if curr_hash and curr_hash == other_hash:
                return {
                    "is_redundant": True,
                    "redundancy_group_id": f"DUP-{obs.get('observation_id')}",
                    "representative_observation_id": obs.get("observation_id"),
                    "similarity_score": 0.98,
                    "reason": "exact_content_hash_match"
                }
            
            # Simple text overlap token ratio check
            if curr_text and other_text and len(curr_text) > 10:
                words1 = set(curr_text.split())
                words2 = set(other_text.split())
                jaccard = len(words1 & words2) / max(1, len(words1 | words2))
                if jaccard >= 0.80:
                    return {
                        "is_redundant": True,
                        "redundancy_group_id": f"DUP-{obs.get('observation_id')}",
                        "representative_observation_id": obs.get("observation_id"),
                        "similarity_score": round(jaccard, 2),
                        "reason": "near_duplicate_text"
                    }

        return {
            "is_redundant": False,
            "redundancy_group_id": None,
            "representative_observation_id": None,
            "similarity_score": 0.0,
            "reason": "unique"
        }
