from api.types import Theme
from api.utils import get_heartbeats_by_hours, get_heartbeats_by_range
from api.routes.charts import ChartResponse, get_figure, router
from common.types import HeartbeatInfo
from matplotlib.figure import Figure
from datetime import datetime


def chart_cpu(heartbeats: list[HeartbeatInfo], fig: Figure, cpus: list[str]):
    ax = fig.subplots()

    for cpu in cpus:
        x = []
        y = []
        for heartbeat in heartbeats:
            cpu_info = heartbeat["data"]["cpu"]
            if cpu_info is None:
                continue
            x.append(heartbeat["timestamp"])
            if cpu == "all":
                y.append(cpu_info["total_usage"])
            else:
                y.append(cpu_info["usage"][int(cpu)])

        ax.plot(x, y, label=cpu)

    ax.set_ylim(bottom=0, top=100)


@router.get("/cpu/by-hours")
def cpu_by_hours(cpus: str, hours: int, theme: Theme = "light") -> ChartResponse:
    heartbeats = get_heartbeats_by_hours(hours)
    fig = get_figure(theme)
    chart_cpu(heartbeats, fig, cpus.split(","))
    return ChartResponse(heartbeats=len(heartbeats), fig=fig)


@router.get("/cpu/by-range")
def cpu_by_range(
    cpus: str, before: datetime, after: datetime, theme: Theme = "light"
) -> ChartResponse:
    heartbeats = get_heartbeats_by_range(before, after)
    fig = get_figure(theme)
    chart_cpu(heartbeats, fig, cpus.split(","))
    return ChartResponse(heartbeats=len(heartbeats), fig=fig)
