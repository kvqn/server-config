import subprocess


HostnameInfo = str


def get_hostname() -> HostnameInfo:
    return subprocess.run(["hostname"], capture_output=True).stdout.decode().strip()
