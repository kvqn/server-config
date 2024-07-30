from friday_logger import Logger
import subprocess
import re
import dotenv
from os import getenv
import tapo
import asyncio
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import json
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait 
import time
from selenium.webdriver.support import expected_conditions as EC

dotenv.load_dotenv()

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

def battery_info():
    resp = subprocess.run(["acpi"], capture_output=True)
    match = re.search(r"(\d+)(?=%)", resp.stdout.decode("utf-8"))
    match = re.search(r"((?:Disc|C)harging), (\d+)(?=%)", resp.stdout.decode("utf-8"))
    if not match or not match.group(1) or not match.group(2):
        raise Exception("Unable to parse acpi output")
    is_charging = match.group(1) == 'Charging'
    return int(match.group(2)), is_charging

def initialize_driver():
    service = Service(executable_path="/root/server-config/scripts/plug-controller/chromedriver")

    options = Options()
    options.add_argument(r"user-data-dir=/root/.config/chromium")
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")

    logger.debug("Initializing webdriver")
    driver = webdriver.Chrome(service=service, options=options)
    logger.debug("Initialized webdriver")
    return driver

def _get_element(driver, xpath):
    return WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, xpath)))

def turn_on():
    try:
        driver = initialize_driver()
        driver.get("https://home.google.com")
        XPATH = "//div[@class='automation-name' and contains(text(), 'Zeb Turn On')]/../..//button"
        element = _get_element(driver, XPATH)
        element.click()

        logger.debug("clicked turn on")
        logger.debug("sleeping for 5 seconds")
        time.sleep(5)
    except Exception as e:
        logger.error(f"Error occured while turning on plug : {e}")
        raise e
    finally:
        driver.close()
        logger.debug("driver closed")


def turn_off():
    try:
        driver = initialize_driver()
        driver.get("https://home.google.com")
        XPATH = "//div[@class='automation-name' and contains(text(), 'Zeb Turn Off')]/../..//button"
        element = _get_element(driver, XPATH)
        element.click()

        logger.debug("clicked turn off")
        logger.debug("sleeping for 5 seconds")

        time.sleep(5)
    except Exception as e:
        logger.error(f"Error occured while turning off plug : {e}")
        raise e
    finally:
        driver.close()
        logger.debug("driver closed")

def turn_on_with_retries(retries):
    for i in range(retries):
        logger.debug(f"Attempting to turn on plug {i+1}/{retries}")
        try:
            turn_on()
        except:
            continue
        break

def turn_off_with_retries(retries):
    for i in range(retries):
        logger.debug(f"Attempting to turn on plug {i+1}/{retries}")
        try:
            turn_off()
        except:
            continue
        break

async def main():
    logger.info("Starting plug-controller loop")

    while True:
        logger.debug("Getting device info")
        battery, is_charging = battery_info()
        logger.debug(f"Battery percentage : {battery}%, Plug is {"ON" if is_charging else "OFF"}")
        print(f"Battery percentage : {battery}%, Plug is {"ON" if is_charging else "OFF"}")
        if battery <= BATTERY_LOWER_LIMIT and not is_charging:
            logger.info("Turning plug on")
            print("Turning plug on")
            turn_on_with_retries(3)
            logger.info("Turned plug on")
            print("Turned plug on")
        if battery >= BATTERY_UPPER_LIMIT and is_charging:
            logger.info("Turning plug off")
            print("Turning plug off")
            turn_off_with_retries(3)
            logger.info("Turned plug off")
            print("Turned plug off")
        await asyncio.sleep(SLEEP_TIMEOUT_SEC)
        

asyncio.run(main())
