from pydantic import BaseModel, Field
from typing import Optional
from utils.booking_status import BookingStatus


class UserLoginModel(BaseModel):
    username: str = Field(
        min_length=4, description="Username should be more than four(4) characters", example="JohnDoe")
    password: str = Field(
        min_length=6, description="Password must contain alphanumeric letters", example="password")


class UserResponseModel(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    phone_number: str


class DoctorResponseModel(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    phone_number: str
    speciality: str

class BookingResponseModel(BaseModel):
    id: int
    user_id: int
    doctor_id: int
    booking_date: str
    booking_time: str
    booking_status: str
    booking_note: Optional[str] = Field(None)
    booking_feedback: Optional[str] = Field(None)
