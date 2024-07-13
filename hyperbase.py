import os
from paho.mqtt import client as mqtt_client
import json
import requests

class Hyperbase:
    def __init__(self, broker, port, client_id, topic, project_id, token_id, token, user_collection_id, user_id):
        username = token_id
        password = token

        client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
        client.username_pw_set(username, password)
        
        print(broker)
        print(port)
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
            result = self.client.publish(self.topic, msg, qos=2)
            status = result[0]
            if status == 0:
                print("Hyperbase MQTT Client successfully sent message")
            else:
                print("Hyperbase MQTT Client failed to sent message")
        else:
            print("Hyperbase MQTT Client is not ready")

class HyperbaseREST:
    def __init__(self, base_url, project_id, token_id, token):
        self.base_url = base_url
        self.project_id = project_id
        self.token_id = token_id
        self.token = token

    def signIn(self, collection_id, data):
        body = json.dumps({
            "token_id": self.token_id,
            "token": self.token,
            "collection_id": collection_id,
            "data": data
        })
        headers = {"content-type": "application/json"}
        res = requests.post(
            self.base_url+"/api/rest/auth/token-based",
            data=body,
            headers=headers,
        )
        if res.status_code == 200:
            res = res.json()
            self.auth_token = res["data"]["token"]
        else:
            print("HyperbaseREST Client: login failed")
            print(res)
            print(res.json())
    
    def setCollection(self, collection_id):
        return HyperbaseRESTCollection(self, collection_id)

class HyperbaseRESTCollection:
    def __init__(self, hyperbase, collection_id):
        self.hyperbase = hyperbase
        self.collection_id = collection_id
    
    def updateOne(self, id, obj):
        body = json.dumps(obj)
        headers = {
            "content-type": "application/json",
            "authorization": "Bearer "+self.hyperbase.auth_token
        }
        res = requests.patch(
            self.hyperbase.base_url+"/api/rest/project/"+self.hyperbase.project_id+"/collection/"+self.collection_id+"/record/"+id,
            data=body,
            headers=headers
        )
        if res.status_code != 200:
            print("HyperbaseREST Client: update data in collection "+id+" failed: ", res.json())