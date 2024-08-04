import subprocess
from common.types.hostname import HostnameInfo


def get_hostname() -> HostnameInfo:
    return subprocess.run(["hostname"], capture_output=True).stdout.decode().strip()
