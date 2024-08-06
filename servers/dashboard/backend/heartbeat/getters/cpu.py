from common.types.cpu import CpuInfo
from datetime import datetime, timedelta
from heartbeat.logger import logger
from typing import Optional
import json
from heartbeat.daemons.cpu import get_latest_cpu_data


logger = logger.getChild("cpu")


def get_cpu() -> Optional[CpuInfo]:
    data = get_latest_cpu_data()
    if data is None:
        logger.error("No CPU data found")
    return data
