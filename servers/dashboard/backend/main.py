from typing import Union

from fastapi import FastAPI
from .battery import get_battery
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
def battery(hours: int) -> ImageResponse:
    return get_battery(hours)
