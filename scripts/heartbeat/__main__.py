from typing import TypedDict, Optional
import json

from heartbeat.logger import logger

from heartbeat.getters.hostname import get_hostname, HostnameInfo
from heartbeat.getters.battery import get_battery, BatteryInfo


class Heartbeat(TypedDict):
    hostname: HostnameInfo
    battery: Optional[BatteryInfo]


logger.debug("Sending heartbeat")

try:
    heartbeat_info: Heartbeat = {"hostname": get_hostname(), "battery": get_battery()}
    heartbeat_info_json = json.dumps(heartbeat_info)
    logger.info(heartbeat_info_json)
    logger.debug("Sent heartbeat")
except Exception as e:
    logger.error("Error while generating hearbeat : ", e)
