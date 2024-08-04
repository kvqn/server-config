from common.types.memory import MemoryInfo
from common.types.battery import BatteryInfo
from common.types.cpu import CpuInfo
from common.types.hostname import HostnameInfo
from typing import TypedDict, Optional
from datetime import datetime


class Heartbeat(TypedDict):
    hostname: HostnameInfo
    battery: Optional[BatteryInfo]
    memory: Optional[MemoryInfo]
    cpu: Optional[CpuInfo]


class HeartbeatInfo(TypedDict):
    data: Heartbeat
    timestamp: datetime
