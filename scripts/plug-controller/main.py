from friday_logger import Logger
import subprocess
import re
import dotenv
from os import getenv
import tapo
import asyncio

dotenv.load_dotenv()

TAPO_USERNAME = getenv("TAPO_USERNAME")
assert TAPO_USERNAME is not None

TAPO_PASSWORD = getenv("TAPO_PASSWORD")
assert TAPO_PASSWORD is not None

TAPO_PLUG_IP = getenv("TAPO_PLUG_IP")
assert TAPO_PLUG_IP is not None

SLEEP_TIMEOUT_SEC = int(getenv("SLEEP_TIMEOUT_SEC"))
assert SLEEP_TIMEOUT_SEC is not None

BATTERY_LOWER_LIMIT = int(getenv("BATTERY_LOWER_LIMIT"))
assert BATTERY_LOWER_LIMIT is not None

BATTERY_UPPER_LIMIT = int(getenv("BATTERY_UPPER_LIMIT"))
assert BATTERY_UPPER_LIMIT is not None

FRIDAY_ENDPOINT = getenv("FRIDAY_ENDPOINT")
assert FRIDAY_ENDPOINT is not None

FRIDAY_NAMESPACE = getenv("FRIDAY_NAMESPACE")
FRIDAY_TOPIC = getenv("FRIDAY_TOPIC")

logger = Logger(FRIDAY_ENDPOINT, FRIDAY_NAMESPACE, FRIDAY_TOPIC)

def battery_percentage():
    resp = subprocess.run(["acpi"], capture_output=True)
    match = re.search(r"(\d+)(?=%)", resp.stdout.decode("utf-8"))
    if not match or not match.group(1):
        raise Exception("Unable to parse acpi output")
    return int(match.group(1))

async def main():
    logger.info("Starting plug-controller loop")
    client = tapo.ApiClient(TAPO_USERNAME, TAPO_PASSWORD)
    device = await client.p110(TAPO_PLUG_IP)

    while True:
        logger.debug("Getting device info")
        battery = battery_percentage()
        device_on = (await device.get_device_info_json())['device_on']
        logger.debug(f"Battery percentage : {battery}%, Plug is {"ON" if device_on else "OFF"}")
        if battery <= BATTERY_LOWER_LIMIT and not device_on:
            logger.info("Turning plug on")
            device.on()
        if battery >= BATTERY_UPPER_LIMIT and device_on:
            logger.info("Turning plug off")
            device.off()
        await asyncio.sleep(SLEEP_TIMEOUT_SEC)

asyncio.run(main())