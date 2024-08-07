from datetime import datetime, timedelta
import json
from common.types import HeartbeatInfo, Heartbeat
from api.aggregator import aggregator
from pydantic import TypeAdapter, ValidationError


def get_heartbeats_by_hours(hours: int) -> list[HeartbeatInfo]:
    data = aggregator.query(
        namespace_and_topics=[{"namespace": "heartbeat", "topic": "laptop"}],
        limit=100000,
        level="INFO",
        after=datetime.now() - timedelta(hours=hours),
    )

    heartbeats = _prepare_heartbeat_data(data)
    return heartbeats


def get_heartbeats_by_range(before: datetime, after: datetime) -> list[HeartbeatInfo]:
    data = aggregator.query(
        namespace_and_topics=[{"namespace": "heartbeat", "topic": "laptop"}],
        limit=100000,
        level="INFO",
        before=before,
        after=after,
    )

    heartbeats = _prepare_heartbeat_data(data)
    return heartbeats


heartbeat_adapter = TypeAdapter(Heartbeat)
heartbeat_info_adapter = TypeAdapter(HeartbeatInfo)


def _prepare_heartbeat_data(data) -> list[HeartbeatInfo]:
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
