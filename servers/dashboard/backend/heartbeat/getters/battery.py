from common.types.battery import BatteryInfo
from heartbeat.logger import logger
from typing import Optional
import re
import subprocess


logger = logger.getChild("battery")


def get_battery() -> Optional[BatteryInfo]:
    out = subprocess.run(["acpi"], capture_output=True).stdout.decode()
    match = re.search(r"((?:Discharging)|(?:Charging)), (\d+)%", out)
    try:
        if not match:
            raise Exception(out)

        charging = True if match.group(1) == "Charging" else False
        percent = int(match.group(2))

        return {"charging": charging, "percent": percent}
    except Exception as e:
        logger.error("Unable to parse acpi output")
        return
