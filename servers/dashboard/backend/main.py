from typing import Union, Literal

from fastapi import FastAPI
from .battery import get_battery
from .cpu import get_cpu
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageResponse(Response):
    media_type = "image/png"


@app.get("/battery", response_class=ImageResponse)
def battery(hours: int, theme: Literal["light", "dark"] = "light") -> ImageResponse:
    return get_battery(hours, theme)


@app.get("/cpu")
def cpu(hours: int, cpus: str):
    return get_cpu(hours=hours, cpus=cpus.split(","), theme="light")


@app.get("/ping")
def ping():
    return "pong"
