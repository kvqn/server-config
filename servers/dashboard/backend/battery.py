import requests
from .args import args
import json
from datetime import datetime, timedelta
from matplotlib.figure import Figure
import matplotlib.dates as mdates
import io
from fastapi.responses import Response
import matplotlib.style
import matplotlib
from typing import Literal, Union


def get_battery(hours: int, theme: Union[Literal["light"], Literal["dark"]]):
    if theme == "dark":
        matplotlib.style.use("dark_background")
    else:
        matplotlib.style.use("default")

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
    for tick in ax.get_xticklabels():
        tick.set_rotation(55)

    filelike = io.BytesIO()
    fig.savefig(filelike, format="png")
    filelike.seek(0)

    bytes = filelike.read()
    return Response(content=bytes, media_type="image/png")
