from typing import Union

from fastapi import FastAPI
from .battery import get_battery

app = FastAPI()


@app.get("/battery")
def battery():
    return get_battery()
