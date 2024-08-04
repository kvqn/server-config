from .args import args
from friday import Aggregator
from typing import Union, Literal
from datetime import datetime, timedelta
import json

aggregator = Aggregator(args.friday_endpoint)

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
