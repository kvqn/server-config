from typing import TypedDict, Optional
import json

from heartbeat.logger import logger

from heartbeat.getters.hostname import get_hostname, HostnameInfo
from heartbeat.getters.battery import get_battery, BatteryInfo
from heartbeat.getters.memory import get_memory, MemoryInfo
from heartbeat.getters.cpu import get_cpu, CpuInfo


class Heartbeat(TypedDict):
    hostname: HostnameInfo
    battery: Optional[BatteryInfo]
    memory: Optional[MemoryInfo]
    cpu: Optional[CpuInfo]


logger.debug("Sending heartbeat")

try:
    heartbeat_info: Heartbeat = {
        "hostname": get_hostname(),
        "battery": get_battery(),
        "memory": get_memory(),
        "cpu": get_cpu(),
    }
    heartbeat_info_json = json.dumps(heartbeat_info)
    logger.info(heartbeat_info_json)
    logger.debug("Sent heartbeat")
except Exception as e:
    logger.error("Error while generating hearbeat")
