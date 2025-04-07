from fastapi import APIRouter, Depends, Form, HTTPException, status
from app.model.model import DoctorModel as DoctorMod
from sqlalchemy.orm import Session
from app.database import db_models, start_db
from utils.user_login_model import UserLoginModel
from utils.password_hash import get_password_hash, verify_password

from typing import Annotated

router = APIRouter(
    prefix="/api",
    tags=["Doctor"]
)


@router.get("/doctor")
async def get_all_doctors(db: Annotated[Session, Depends(start_db.get_db)]):
    doctors_data = db.query(db_models.Doctor).all()

    return {"data": doctors_data}


@router.get("/doctor/{doctor_id}", status_code=status.HTTP_200_OK)
async def get_doctor_by_id(doctor_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    doctor = db.query(db_models.Doctor).filter(
        db_models.Doctor.id == doctor_id).first()

    if doctor is None:
        return HTTPException(status_code=404, detail="Doctor not found", headers={"X-Doctor": "Doctor not Found"})

    return {"data": doctor}


@router.post("/doctor/login", status_code=status.HTTP_200_OK)
async def get_doctor_by_email_and_password(data: UserLoginModel, db: Annotated[Session, Depends(start_db.get_db)]):
    if data.username is None and data.password is None:
        return {"message": "Please provide username and password"}

    doctor = db.query(db_models.Doctor).filter(
        db_models.Doctor.username == data.username).first()

    if doctor is None:
        return HTTPException(status_code=404, detail="Doctor not found", headers={"X-Username": "Doctor not Found"})

    doctor_hash_password = get_password_hash(data.password)
    if verify_password(data.password, doctor_hash_password) is False:
        return HTTPException(status_code=404, detail="Invalid password", headers={"X-Password": "Password is incorrect"})

    return {"data": {"username": doctor.username, "email": doctor.email, "first_name": doctor.first_name, "last_name": doctor.last_name,
            "phone_number": doctor.phone_number, "doctor_id": doctor.id, "speciality": doctor.speciality}}


@router.post("/doctor/signup", status_code=status.HTTP_201_CREATED)
async def create_doctor(doctor: DoctorMod, db: Annotated[Session, Depends(start_db.get_db)]):
    doctor_hash_password = get_password_hash(doctor.password)
    doctor = db_models.Doctor(email=doctor.email, username=doctor.username,
                              first_name=doctor.first_name, last_name=doctor.last_name, hashed_password=doctor_hash_password,
                              phone_number=doctor.phone_number, speciality=doctor.speciality)

    db.add(doctor)
    db.commit()
    return {"message": "Doctor has been added successfully"}
