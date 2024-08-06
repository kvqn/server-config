from api.routes.charts import router, FigureResponse, get_figure
from api.types import Theme
from api.utils import get_heartbeats


@router.get("/battery")
def chart_battery(hours: int, theme: Theme = "light") -> FigureResponse:
    heartbeats = get_heartbeats(hours)
    fig = get_figure(theme)

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

    return FigureResponse(fig)
