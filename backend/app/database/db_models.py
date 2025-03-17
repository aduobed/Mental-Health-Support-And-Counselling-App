from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database.database import Base
import datetime

# User Model - Represents Users who can book appointments
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


# Doctor Model - Represents Doctors who provide counseling
class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True)
    specialty = Column(String(255), nullable=False)

    # Relationship: One Doctor can have multiple Bookings
    bookings = relationship("Booking", back_populates="doctor")


# Booking Model - Represents appointments between Users and Doctors
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    appointment_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String(50), default="pending")

    # Relationships: Each Booking is linked to a User and a Doctor
    user = relationship("User", back_populates="bookings")
    doctor = relationship("Doctor", back_populates="bookings")
