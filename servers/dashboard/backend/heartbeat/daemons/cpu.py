import subprocess
import asyncio
import json
from common.types.cpu import CpuInfo
from typing import Optional
from heartbeat.logger import logger

logger = logger.getChild("cpu-daemon")

latest_cpu_data: Optional[CpuInfo] = None


async def cpu_daemon():

    global latest_cpu_data

    command = r"S_TIME_FORMAT=ISO mpstat -P ALL 5 1 -o JSON | jq '{date: .sysstat.hosts.[0].date} + .sysstat.hosts.[0].statistics.[0]'"
    while True:
        logger.debug("Getting CPU data")
        output = subprocess.run(
            ["bash", "-c", command], capture_output=True
        ).stdout.decode()
        data = json.loads(output)

        total_usage = None
        usage = {}

        for cpu in data["cpu-load"]:
            cpu_id = cpu["cpu"]
            if cpu_id == "all":
                total_usage = 100 - cpu["idle"]
            else:
                usage[cpu_id] = 100 - cpu["idle"]

        if total_usage is None:
            logger.error("Total CPU usage not found")
            raise Exception("Total CPU usage not found")

        latest_cpu_data = CpuInfo(
            usage=usage,
            total_usage=total_usage,
        )

        logger.debug("Got CPU data")

        await asyncio.sleep(0)
