from common.types import Heartbeat

from heartbeat.getters.battery import get_battery
from heartbeat.getters.cpu import get_cpu
from heartbeat.getters.hostname import get_hostname
from heartbeat.getters.memory import get_memory

from heartbeat.logger import logger

import json
import asyncio


def main():
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


TIMEOUT_SEC = 10


async def main_daemon():
    while True:
        main()
        await asyncio.sleep(TIMEOUT_SEC)
