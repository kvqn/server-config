from api.types import Theme
from fastapi import APIRouter
from fastapi.responses import Response
from matplotlib.figure import Figure
import io
import matplotlib.style
import base64
from pydantic import BaseModel

router = APIRouter()


def get_figure(theme: Theme) -> Figure:
    if theme == "dark":
        matplotlib.style.use("dark_background")
    else:
        matplotlib.style.use("default")
    return Figure()


class ChartResponse(BaseModel):
    heartbeats: int
    fig: str

    def __init__(self, heartbeats: int, fig: Figure):
        filelike = io.BytesIO()
        fig.savefig(filelike, format="png")
        filelike.seek(0)
        fig_base64 = base64.b64encode(filelike.read()).decode()
        super().__init__(heartbeats=heartbeats, fig=fig_base64)


import api.routes.charts.battery
import api.routes.charts.cpu
