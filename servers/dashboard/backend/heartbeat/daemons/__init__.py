from heartbeat.daemons.main import main_daemon
from heartbeat.daemons.cpu import cpu_daemon
import asyncio


async def _gather_daemons():
    await asyncio.gather(
        main_daemon(),
        cpu_daemon(),
    )


def run_daemons():
    asyncio.run(_gather_daemons())
