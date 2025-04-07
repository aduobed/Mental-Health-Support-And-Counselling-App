from fastapi.testclient import TestClient
from app.main import app
from app.database.db_models import Base, User, Doctor, Booking
from app.database.start_db import engine
from sqlalchemy.orm import sessionmaker
from datetime import time
import pytest


client = TestClient(app)

# Create a new sessionmaker for the test database
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="function")
def db_session():
    # Create the database tables
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    yield db
    db.close()
    # Drop the database tables
    Base.metadata.drop_all(bind=engine)

def test_create_user(db_session):
    response = client.post("/api/user/signup", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "first_name": "Test",
        "last_name": "User",
        "password": "password123",
        "phone_number": "1234567890"
    })
    assert response.status_code == 201
    assert response.json() == {"message": "User has been added successfully"}

def test_get_all_users(db_session):
    response = client.get("/api/user")
    assert response.status_code == 200
    assert "data" in response.json()

def test_user_login(db_session):
    client.post("/api/user/signup", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "first_name": "Test",
        "last_name": "User",
        "password": "password123",
        "phone_number": "1234567890"
    })

    response = client.post("/api/user/login", data={
        "username": "testuser",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "data" in response.json()

def test_create_doctor(db_session):
    response = client.post("/api/doctor/signup", json={
        "username": "dotortet",
        "email": "doctest@example.com",
        "first_name": "Doctor",
        "last_name": "Test",
        "password": "password123",
        "phone_number": "0987654321",
        "speciality": "Cardiologist"
    })
    assert response.status_code == 201
    assert response.json() == {"message": "Doctor has been added successfully"}

def test_get_all_doctors(db_session):
    response = client.get("/api/doctor")
    assert response.status_code == 200
    assert "data" in response.json()

def test_create_booking(db_session):
    create_test_client_and_doctor()

    response = client.post("/api/booking", json={
        "user_id": 1,
        "doctor_id": 1,
        "booking_date": "2025-07-10",
        "booking_time": "2025-07-10",
        "booking_status": "pending",
        "booking_note": "",
        "booking_feedback": ""
    })
    assert response.status_code == 201
    assert response.json() == {"message": "Booking has been added successfully"}

def test_get_all_bookings(db_session):
    response = client.get("/api/booking")
    assert response.status_code == 200
    assert "data" in response.json()

def test_get_booking_by_id(db_session):
    create_test_booking()

    response = client.get("/api/booking/1")
    assert response.status_code == 200
    assert "data" in response.json()


def create_test_client_and_doctor():
        client.post("/api/user/signup", json={
            "username": "testuser",
            "email": "testuser@example.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "password123",
            "phone_number": "1234567890"
        })

        client.post("/api/doctor/signup", json={
            "username": "dotortet",
            "email": "doctest@example.com",
            "first_name": "Doctor",
            "last_name": "Test",
            "password": "password123",
            "phone_number": "0987654321",
            "speciality": "Cardiologist"
        })
def create_test_booking():
    create_test_client_and_doctor()

    response = client.post("/api/booking", json={
        "user_id": 1,
        "doctor_id": 1,
        "booking_date": "2025-07-10",
        "booking_time": "2025-07-10",
        "booking_status": "pending",
        "booking_note": "",
        "booking_feedback": ""
    })