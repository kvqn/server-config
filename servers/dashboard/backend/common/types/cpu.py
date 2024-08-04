from typing import TypedDict, Dict


class CpuInfo(TypedDict):
    usage: Dict[int, float]
    total_usage: float
