from fastapi import WebSocket, WebSocketDisconnect
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_event_update(self, event_data: dict):
        payload = json.dumps({"type": "EVENT_UPDATE", "data": event_data})
        for connection in self.active_connections:
            try:
                await connection.send_text(payload)
            except Exception:
                pass

ws_manager = ConnectionManager()
