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
from friday import Aggregator

aggregator = Aggregator(args.friday_endpoint)


def get_battery(hours: int, theme: Union[Literal["light"], Literal["dark"]]):
    if theme == "dark":
        matplotlib.style.use("dark_background")
    else:
        matplotlib.style.use("default")

    data = aggregator.query(
        namespace_and_topics=[{"namespace": "heartbeat", "topic": "laptop"}],
        limit=10000,
        level="INFO",
        after=datetime.now() - timedelta(hours=hours),
    )
    parsed_data = [
        {
            **i,
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
