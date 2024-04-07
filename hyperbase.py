import os
import sys
from paho.mqtt import client as mqtt_client
import json

class Hyperbase:
    def __init__(self, broker, port, client_id, topic, project_id, token_id, token, user_collection_id, user_id):
        if broker == None or broker == '':
            print("broker can't be None or empty string")
            sys.exit(1)
            return
        if port == None or port == '':
            print("port can't be None or empty string")
            sys.exit(1)
            return
        if client_id == None or client_id == '':
            print("client_id can't be None or empty string")
            sys.exit(1)
            return
        if topic == None or topic == '':
            print("topic can't be None or empty string")
            sys.exit(1)
            return
        if project_id == None or project_id == '':
            print("project_id can't be None or empty string")
            sys.exit(1)
            return
        if token_id == None or token_id == '':
            print("token_id can't be None or empty string")
            sys.exit(1)
            return
        if token == None or token == '':
            print("token can't be None or empty string")
            sys.exit(1)
            return
        if user_collection_id == None or user_collection_id == '':
            print("user_collection_id can't be None or empty string")
            sys.exit(1)
            return
        if user_id == None or user_id == '':
            print("user_id can't be None or empty string")
            sys.exit(1)
            return

        username = token_id
        password = token

        client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
        client.username_pw_set(username, password)
        # client.connect(broker, int(port))

        # Check if port is None before converting to int
        if port is not None:
            client.connect(broker, int(port))
        else:
            print("Port is not provided or is invalid.")

        self.client = client
        self.topic = topic
        self.project_id = project_id
        self.token_id = token_id
        self.token = token
        self.user_collection_id = user_collection_id
        self.user_id = user_id
        self.is_ready = True

    def is_ready(self):
        return self.is_ready

    def publish(self, collection_id, data):
        if self.is_ready:
            msg = json.dumps({
                "project_id": self.project_id,
                "token_id": self.token_id,
                "user": {
                    "collection_id": self.user_collection_id,
                    "id": self.user_id
                },
                "collection_id": collection_id,
                "data": data
            })
            result = self.client.publish(self.topic, msg)
            status = result[0]
            if status == 0:
                print("Hyperbase MQTT Client successfully sent message")
            else:
                print("Hyperbase MQTT Client failed to sent message")
        else:
            print("Hyperbase MQTT Client is not ready")