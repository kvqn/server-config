from datetime import datetime, timedelta
import json
from common.types import HeartbeatInfo, Heartbeat
from api.aggregator import aggregator
from pydantic import TypeAdapter, ValidationError


def get_heartbeats(hours: int) -> list[HeartbeatInfo]:
    data = aggregator.query(
        namespace_and_topics=[{"namespace": "heartbeat", "topic": "laptop"}],
        limit=100000,
        level="INFO",
        after=datetime.now() - timedelta(hours=hours),
    )

    heartbeat_adapter = TypeAdapter(Heartbeat)
    heartbeat_info_adapter = TypeAdapter(HeartbeatInfo)

    parsed_data = []
    for i in data:
        try:
            parsed = heartbeat_info_adapter.validate_python(
                {
                    **i,
                    "data": heartbeat_adapter.validate_python(json.loads(i["data"])),
                }
            )
            parsed_data.append(parsed)
        except ValidationError:
            continue

    return parsed_data
