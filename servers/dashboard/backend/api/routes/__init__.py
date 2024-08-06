from fastapi import APIRouter
from api.routes.charts import router as charts_router

router = APIRouter()

router.include_router(charts_router, prefix="/charts")
