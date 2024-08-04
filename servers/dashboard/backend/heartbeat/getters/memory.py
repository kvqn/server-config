import subprocess
from typing import Optional
from heartbeat.logger import logger
from common.types.memory import MemoryInfo


logger = logger.getChild("memory")


def get_memory() -> Optional[MemoryInfo]:
    try:
        out = subprocess.run(["free"], capture_output=True).stdout.decode()
        lines = out.splitlines()

        mem = lines[1].split()[1:]
        mem_total, mem_used, mem_free, mem_shared, mem_buff, mem_available = mem

        swap = lines[2].split()[1:]
        swap_total, swap_used, swap_free = swap

        return {
            "mem": {
                "total": int(mem_total),
                "used": int(mem_used),
                "free": int(mem_free),
                "shared": int(mem_shared),
                "buff": int(mem_buff),
                "available": int(mem_available),
            },
            "swap": {
                "total": int(swap_total),
                "used": int(swap_used),
                "free": int(swap_free),
            },
        }
    except Exception as e:
        logger.error("Unable to parse free output")
        return
