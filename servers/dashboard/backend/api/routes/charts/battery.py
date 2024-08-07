from api.routes.charts import router, FigureResponse, get_figure
from api.types import Theme
from api.utils import get_heartbeats_by_hours, get_heartbeats_by_range
from matplotlib.figure import Figure
from common.types import HeartbeatInfo
from datetime import datetime


def chart_battery(heartbeats: list[HeartbeatInfo], fig: Figure):
    x, y = [], []
    for heartbeat in heartbeats:
        battery_info = heartbeat["data"]["battery"]
        if not battery_info:
            continue
        x.append(heartbeat["timestamp"])
        y.append(battery_info["percent"])

    ax = fig.subplots()
    ax.plot(x, y)
    for tick in ax.get_xticklabels():
        tick.set_rotation(55)


@router.get("/battery/by-hours")
def battery_by_hours(hours: int, theme: Theme = "light") -> FigureResponse:
    heartbeats = get_heartbeats_by_hours(hours)
    fig = get_figure(theme)
    chart_battery(heartbeats, fig)
    return FigureResponse(fig)


@router.get("/battery/by-range")
def battery_by_range(
    before: datetime, after: datetime, theme: Theme = "light"
) -> FigureResponse:
    heartbeats = get_heartbeats_by_range(before, after)
    fig = get_figure(theme)
    chart_battery(heartbeats, fig)
    return FigureResponse(fig)
