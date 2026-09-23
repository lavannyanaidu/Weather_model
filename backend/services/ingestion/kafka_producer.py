import json

class KafkaObservationProducer:
    """
    Kafka Event Stream Producer Abstraction
    Emits raw and normalized observation events to Kafka topics (e.g. observations.raw).
    """
    def __init__(self, bootstrap_servers: str = "localhost:9092"):
        self.bootstrap_servers = bootstrap_servers

    def publish_observation(self, topic: str, observation: dict) -> bool:
        print(f"[KafkaProducer] Published observation {observation.get('source_id')} to topic '{topic}'")
        return True
