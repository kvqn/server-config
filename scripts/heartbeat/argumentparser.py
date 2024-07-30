from argparse import ArgumentParser
from typing import Optional
from dotenv import load_dotenv
from os import getenv

parser = ArgumentParser("heartbeat")

load_dotenv()

FRIDAY_ENDPOINT = getenv("FRIDAY_ENDPOINT")
FRIDAY_NAMESPACE = getenv("FRIDAY_NAMESPACE")
FRIDAY_TOPIC = getenv("FRIDAY_TOPIC")


class Arguments:
    def __init__(
        self,
        friday_endpoint: Optional[str],
        friday_namespace: Optional[str],
        friday_topic: Optional[str],
    ):

        if friday_endpoint:
            self.friday_endpoint = friday_endpoint
        elif FRIDAY_ENDPOINT:
            self.friday_endpoint = FRIDAY_ENDPOINT
        else:
            raise Exception("Friday endpoint not set.")

        if friday_namespace:
            self.friday_namespace = friday_namespace
        elif FRIDAY_ENDPOINT:
            self.friday_namespace = FRIDAY_NAMESPACE
        else:
            print("Friday namespace not set. Using default")
            self.friday_namespace = "default"

        if friday_topic:
            self.friday_topic = friday_topic
        elif FRIDAY_ENDPOINT:
            self.friday_topic = FRIDAY_TOPIC
        else:
            print("Friday topic not set. Using default")
            self.friday_topic = "default"


parser.add_argument("--friday-endpoint", type=str)
parser.add_argument("--friday-namespace", type=str)
parser.add_argument("--friday-topic", type=str)


def get_args() -> Arguments:
    args = parser.parse_args()
    return Arguments(
        friday_endpoint=args.friday_endpoint,
        friday_namespace=args.friday_namespace,
        friday_topic=args.friday_topic,
    )
