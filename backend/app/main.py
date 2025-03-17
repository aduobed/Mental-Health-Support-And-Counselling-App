from fastapi import FastAPI
from app.routers import user, doctor, booking


app = FastAPI()

app.include_router(user.router)
app.include_router(doctor.router)
app.include_router(booking.router)
