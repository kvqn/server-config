from typing import TypedDict, Optional, Dict
from . import logger
import json
from datetime import datetime, timedelta


class CpuInfo(TypedDict):
    usage: Dict[int, float]
    total_usage: float


logger = logger.getChild("cpu")

def get_cpu() -> Optional[CpuInfo]:
    try:
        with open("heartbeat/cpu-usage-daemon/cpu-usage.json", 'r') as file:
            data = json.load(file)

        timestamp = datetime.strptime(f"{data["date"]} {data["timestamp"]}", r"%Y-%m-%d %H:%M:%S")
        if datetime.now() > timestamp + timedelta(seconds=10):
            raise Exception("cpu-usage.json is expired.")

        
        usage = {}
        total_usage = None
        for cpu in data["cpu-load"]:
            if cpu["cpu"] == "all":
                total_usage = round(100 - float(cpu["idle"]), 2)
            else:
                usage[int(cpu["cpu"])] = round(100 - float(cpu["idle"]), 2)

        assert isinstance(total_usage, float)

        return {
            "total_usage": total_usage,
            "usage": usage
        }
    except Exception as e:
        logger.error("Error while getting cpu info")
        return
