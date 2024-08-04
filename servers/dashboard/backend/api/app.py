from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router


origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
def ping():
    return "pong"


app.include_router(router)


# @app.get("/battery", response_class=ImageResponse)
# def battery(hours: int, theme: Literal["light", "dark"] = "light") -> ImageResponse:
#     return get_battery(hours, theme)


# @app.get("/cpu")
# def cpu(hours: int, cpus: str):
#     return get_cpu(hours=hours, cpus=cpus.split(","), theme="light")
