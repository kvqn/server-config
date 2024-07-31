import requests
from .args import args
import json
from datetime import datetime, timedelta
from matplotlib.figure import Figure
import matplotlib.dates as mdates
import io
from fastapi.responses import Response


def get_battery(hours: int):
    query = {
        "namespacesAndTopics": [{"namespace": "heartbeat", "topic": "laptop"}],
        "limit": 10000,
        "level": "INFO",
        "after": (datetime.now() - timedelta(hours=hours)).strftime(
            "%Y-%m-%dT%H:%M:%S.%fZ"
        ),
    }
    resp = requests.get(
        f"{args.friday_endpoint}/getLogs", params={"input": json.dumps(query)}
    )
    data = resp.json()["result"]["data"]
    parsed_data = [
        {
            "timestamp": datetime.strptime(i["timestamp"], "%Y-%m-%dT%H:%M:%S.%fZ"),
            "data": json.loads(i["data"]),
        }
        for i in data
    ]

    y = [i["data"]["battery"]["percent"] for i in parsed_data]
    x = [i["timestamp"] for i in parsed_data]

    fig = Figure()
    ax = fig.subplots()

    ax.plot(x, y)
    filelike = io.BytesIO()
    fig.savefig(filelike, format="png")
    filelike.seek(0)

    bytes = filelike.read()
    return Response(content=bytes, media_type="image/png")
