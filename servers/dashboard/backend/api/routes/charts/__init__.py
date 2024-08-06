from api.types import Theme
from fastapi import APIRouter
from fastapi.responses import Response
from matplotlib.figure import Figure
import io
import matplotlib.style

router = APIRouter()


def get_figure(theme: Theme) -> Figure:
    if theme == "dark":
        matplotlib.style.use("dark_background")
    else:
        matplotlib.style.use("default")
    return Figure()


class FigureResponse(Response):
    def __init__(self, fig: Figure):
        filelike = io.BytesIO()
        fig.savefig(filelike, format="png")
        filelike.seek(0)
        fig_bytes = filelike.read()
        super().__init__(content=fig_bytes, media_type="image/png")


from api.routes.charts.battery import chart_battery
from api.routes.charts.cpu import chart_cpu
