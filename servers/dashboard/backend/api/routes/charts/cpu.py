from api.types import Theme
from api.utils import get_heartbeats_by_hours
from api.routes.charts import FigureResponse, get_figure, router


@router.get("/cpu")
def chart_cpu(cpus: str, hours: int, theme: Theme) -> FigureResponse:
    heartbeats = get_heartbeats_by_hours(hours)
    fig = get_figure(theme)
    ax = fig.subplots()

    for cpu in cpus.split(","):
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

    return FigureResponse(fig)
