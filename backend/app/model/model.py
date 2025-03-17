from pydantic import BaseModel, Field
from typing import Optional
from utils.booking_status import BookingStatus

class UserModel(BaseModel):
  username: str = Field(min_length=4, description="Username should contain less than four(4) characters", example="JohnDoe")
  email: str = Field(..., example="test@gmail.com")
  first_name: str = Field(max_length=30, description="First name should contain less than 30 characters")
  last_name: str = Field(max_length=30, description="First name should contain less than 30 characters")
  password: str = Field(min_length=6, description="Password must contain alphanumeric letters", example="password")
  phone_number: Optional[str] = Field(None, example="1234567890")

class DoctorModel(BaseModel):
  first_name: str = Field(max_length=30,description="First name should contain less than 30 characters")
  last_name: str = Field(max_length=30, description="First name should contain less than 30 characters")
  email: str = Field(max_length=50, example="test@gmail.com")
  username: str = Field(min_length=4, description="Username should contain less than four(4) characters", example="JohnDoe")
  password: str = Field(min_length=6, description="Password must contain alphanumeric letters", example="password")
  phone_number: Optional[str] = Field(..., example="1234567890")
  speciality: str = Field(..., example="Cardiologist")

class BookingModel(BaseModel):
  user_id: int
  doctor_id: int
  booking_date: str
  booking_time: str
  status: BookingStatus = Field(..., example="pending")
  booking_note: Optional[str] = Field(None)
  booking_feedback: Optional[str] = Field(None)