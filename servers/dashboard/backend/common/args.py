from argparse import ArgumentParser
from dataclasses import dataclass
from dotenv import load_dotenv
from os import getenv
from functools import cache


_parser = ArgumentParser()

_parser.add_argument("--friday-endpoint", type=str)
_parser.add_argument("--friday-namespace", type=str)
_parser.add_argument("--friday-topic", type=str)


@dataclass
class FridayArguments:
    endpoint: str
    namespace: str
    topic: str


@dataclass
class Arguments:
    friday: FridayArguments


@cache
def get_args() -> Arguments:
    """
    Parse the CLI arguments and environment variables.
    """

    load_dotenv()
    args = _parser.parse_args()

    friday_endpoint = args.friday_endpoint
    if not friday_endpoint:
        friday_endpoint = getenv("FRIDAY_ENDPOINT")
    if not friday_endpoint:
        raise Exception("FRIDAY ENDPOINT is not configured.")

    friday_namespace = args.friday_namespace
    if not friday_namespace:
        friday_namespace = getenv("FRIDAY_NAMESPACE")
    if not friday_namespace:
        raise Exception("FRIDAY NAMESPACE is not configured.")

    friday_topic = args.friday_topic
    if not friday_topic:
        friday_topic = getenv("FRIDAY_TOPIC")
    if not friday_topic:
        raise Exception("FRIDAY TOPIC is not configured.")

    return Arguments(
        friday=FridayArguments(
            endpoint=friday_endpoint, namespace=friday_namespace, topic=friday_topic
        )
    )
