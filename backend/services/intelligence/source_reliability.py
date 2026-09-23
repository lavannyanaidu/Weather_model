class SourceReliabilityEngine:
    """
    Source Reliability Module
    Calculates explainable reliability scores based on historical verification rate, location accuracy, and cross-source agreement.
    """
    def calculate_reliability_score(
        self,
        historical_verification: float = 80.0,
        location_accuracy: float = 90.0,
        cross_source_agreement: float = 85.0
    ) -> float:
        score = (historical_verification * 0.4) + (location_accuracy * 0.3) + (cross_source_agreement * 0.3)
        return round(score, 1)
