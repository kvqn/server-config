from common.types.cpu import CpuInfo
from datetime import datetime, timedelta
from heartbeat.logger import logger
from typing import Optional
import json
from heartbeat.daemons.cpu import latest_cpu_data


logger = logger.getChild("cpu")


def get_cpu() -> Optional[CpuInfo]:
    if latest_cpu_data is None:
        logger.error("No CPU data found")
    return latest_cpu_data
