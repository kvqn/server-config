import matplotlib.style
from matplotlib.figure import Figure
from ... import Theme, get_heartbeats
import io
from fastapi.responses import Response


def get_cpu(cpus: list[str], hours: int, theme: Theme):
    if theme == "dark":
        matplotlib.style.use("dark_background")
    else:
        matplotlib.style.use("default")

    heartbeats = get_heartbeats(hours)

    fig = Figure()
    ax = fig.subplots()

    for cpu in cpus:
        x = []
        y = []
        for heartbeat in heartbeats:
            if heartbeat["data"]["cpu"] is None:
                continue
            x.append(heartbeat["timestamp"])
            if cpu == "all":
                y.append(heartbeat["data"]["cpu"]["total_usage"])
            else:
                y.append(heartbeat["data"]["cpu"]["usage"][cpu])

        ax.plot(x, y, label=cpu)

    ax.set_ylim(bottom=0, top=100)

    filelike = io.BytesIO()
    fig.savefig(filelike, format="png")
    filelike.seek(0)

    bytes = filelike.read()
    return Response(content=bytes, media_type="image/png")
