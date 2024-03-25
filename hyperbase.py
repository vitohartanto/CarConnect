import os
import paho.mqtt.publish as publish

def publish(collectionId, data):
    publish.single(os.getenv("HYPERBASE_MQTT_TOPIC"), json.dumps({
        "project_id": os.getenv("PROJECT_ID"),
        "token_id": os.getenv("TOKEN_ID"),
        "token": os.getenv("TOKEN"),
        "user": {
            "collection_id": os.getenv("USER_COLLECTION_ID"),
            "id": os.getenv("USER_ID")
        },
        "collection_id": collectionId,
        "data": data
    }), hostname = os.getenv("HYPERBASE_MQTT_HOST"))