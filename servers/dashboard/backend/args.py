from typing import Optional
from dotenv import load_dotenv
from os import getenv

load_dotenv()

FRIDAY_ENDPOINT = getenv("FRIDAY_ENDPOINT")


class Arguments:
    def __init__(self):
        if FRIDAY_ENDPOINT:
            self.friday_endpoint = FRIDAY_ENDPOINT
        else:
            raise Exception("Friday endpoint is not set.")


args = Arguments()
