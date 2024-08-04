import json
from datetime import datetime, timedelta
from matplotlib.figure import Figure
import io
from fastapi.responses import Response
import matplotlib.style
import matplotlib
from api.utils import aggregator, Theme, chart_wrapper


@chart_wrapper
def get_battery():
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
