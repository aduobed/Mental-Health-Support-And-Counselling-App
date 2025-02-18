from app.routers import user
from fastapi import FastAPI


app = FastAPI()

app.include_router(user.router)