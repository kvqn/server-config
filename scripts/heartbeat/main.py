from friday_logger import Logger
from dotenv import load_dotenv
from os import getenv
import subprocess

load_dotenv()

hostname = subprocess.run(["hostname"], capture_output=True).stdout

FRIDAY_ENDPOINT = getenv("FRIDAY_ENDPOINT")
assert FRIDAY_ENDPOINT is not None

FRIDAY_NAMESPACE = getenv("FRIDAY_NAMESPACE")
FRIDAY_TOPIC = getenv("FRIDAY_TOPIC")

logger = Logger(FRIDAY_ENDPOINT)

logger.info(f"Heartbeat ({hostname})")
