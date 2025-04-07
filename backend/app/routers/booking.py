from fastapi import APIRouter, Depends, Form, HTTPException, status
from app.model.model import BookingModel as BookingMod
from sqlalchemy.orm import Session
from app.database import db_models, start_db
from utils.user_login_model import BookingResponseModel
from utils import booking_status

from typing import Annotated, List

router = APIRouter(
    prefix="/api",
    tags=["Booking"]
)


@router.get("/booking", status_code=status.HTTP_200_OK, response_model=List[BookingResponseModel])
async def get_all_booking(db: Annotated[Session, Depends(start_db.get_db)]):
    booking_data = db.query(db_models.Booking).all()

    return booking_data


@router.get("/booking/user/{user_id}", status_code=status.HTTP_200_OK, response_model=List[BookingResponseModel])
async def get_all_user_booking(user_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    booking_data = db.query(db_models.Booking).filter(
        db_models.Booking.user_id == user_id).all()

    if len(booking_data) == 0:
        raise HTTPException(status_code=404, detail=f"Bookings for user were found", headers={
                            "X-Booking": "Bookings were not Found"})

    return booking_data


@router.get("/booking/{booking_id}", status_code=status.HTTP_200_OK, response_model=BookingResponseModel)
async def get_booking_by_id(booking_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    booking_data = db.query(db_models.Booking).filter(
        db_models.Booking.id == booking_id).first()

    if booking_data is None:
        raise HTTPException(status_code=404, detail="Booking not found", headers={
                            "X-Booking": "Booking not Found"})

    return booking_data


@router.post("/booking", status_code=status.HTTP_201_CREATED)
async def create_booking(booking: BookingMod, db: Annotated[Session, Depends(start_db.get_db)]):
    booking = db_models.Booking(
        user_id=booking.user_id,
        doctor_id=booking.doctor_id,
        booking_date=booking.booking_date,
        booking_time=booking.booking_time,
        booking_status=booking.booking_status.value if booking.booking_status else booking_status.BookingStatus.PENDING.value,
        booking_note=booking.booking_note,
        booking_feedback=booking.booking_feedback
    )

    db.add(booking)
    db.commit()
    return {"message": "Booking has been created successfully"}


@router.patch("/booking/{booking_id}", status_code=status.HTTP_200_OK)
async def update_booking(booking: BookingMod, booking_id: int, db: Annotated[Session, Depends(start_db.get_db)]):

    existing_booking = db.query(db_models.Booking).filter(
        db_models.Booking.id == booking_id).first()

    if existing_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found", headers={
                            "X-Booking": "Booking not Found"})

    existing_booking.booking_date = booking.booking_date
    existing_booking.booking_time = booking.booking_time
    existing_booking.booking_status = booking.booking_status.value
    existing_booking.booking_note = booking.booking_note
    existing_booking.booking_feedback = booking.booking_feedback

    db.add(existing_booking)
    db.commit()

    return {"message": "Booking has been updated successfully"}


@router.delete("/booking/{booking_id}", status_code=status.HTTP_200_OK)
async def delete_booking(booking_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    existing_booking = db.query(db_models.Booking).filter(
        db_models.Booking.id == booking_id).first()

    if existing_booking is None:
        raise HTTPException(status_code=404, detail="Booking not found", headers={
                            "X-Booking": "Booking not Found"})

    db.query(db_models.Booking).filter(
        db_models.Booking.id == booking_id).delete()
    db.commit()

    return {"message": "Booking has been deleted successfully"}
