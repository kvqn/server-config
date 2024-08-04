from typing import TypedDict


class BatteryInfo(TypedDict):
    charging: bool
    percent: int
