from typing import TypedDict


class _SwapInfo(TypedDict):
    total: int
    used: int
    free: int


class _MemInfo(TypedDict):
    total: int
    used: int
    free: int
    shared: int
    buff: int
    available: int


class MemoryInfo(TypedDict):
    mem: _MemInfo
    swap: _SwapInfo
