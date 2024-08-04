from typing import Union, Literal
from datetime import datetime, timedelta
import json
import matplotlib.style
from typing import Callable, TypedDict


Theme = Union[Literal["light"], Literal["dark"]]


def get_heartbeats(hours: int):
    data = aggregator.query(
        namespace_and_topics=[{"namespace": "heartbeat", "topic": "laptop"}],
        limit=100000,
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
    return parsed_data


def chart_wrapper(func: Callable):
    "Function decorator that provides matplotlib figure for plotting the chart with the correct theme and also creates the image response"

    def _func(theme: Theme, hours: int, *args, **kwargs):
        if theme == "dark":
            matplotlib.style.use("dark_background")
        else:
            matplotlib.style.use("default")

        heartbeats = get_heartbeats(hours)
        func(heartbeats, *args, **kwargs)

    return _func
