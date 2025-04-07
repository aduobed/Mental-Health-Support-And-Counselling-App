from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database.database import Base
import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    username = Column(String(255), unique=True, index=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    hashed_password = Column(String(255))
    phone_number = Column(String(50))

    # Relationship: One User can have multiple Bookings
    bookings = relationship("Booking", back_populates="user")


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    username = Column(String(255), unique=True, index=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    hashed_password = Column(String(255))
    phone_number = Column(String(50))
    speciality = Column(String(255), nullable=False)

    # Relationship: One Doctor can have multiple Bookings
    bookings = relationship("Booking", back_populates="doctor")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    booking_date = Column(String, default=datetime.datetime.date)
    booking_time = Column(String, default=datetime.timezone.utc)
    booking_status = Column(String(50), default="pending")
    booking_note = Column(String(255), nullable=True)
    booking_feedback = Column(String(255), nullable=True)

    # Relationships: Each Booking is linked to a User and a Doctor
    user = relationship("User", back_populates="bookings")
    doctor = relationship("Doctor", back_populates="bookings")
