import requests
from .args import args
import json


def get_battery():
    query = {
        "namespacesAndTopics": [{"namespace": "heartbeat", "topic": "laptop"}],
        "limit": 100,
        "level": "INFO",
    }
    resp = requests.get(
        f"{args.friday_endpoint}/getLogs", params={"input": json.dumps(query)}
    )
    data = resp.json()["result"]["data"]
    heartbeats = [json.loads(i["data"]) for i in data]
    return heartbeats
