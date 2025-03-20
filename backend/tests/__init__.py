# filepath: /Users/dark-lord/Code/projects/Mental-Health-Support-And-Counselling-App/backend/tests/test_models.py
from app.model.model import UserModel

def test_user_model():
    user = UserModel(
        username="testuser",
        email="testuser@example.com",
        first_name="Test",
        last_name="User",
        password="password123",
        phone_number="1234567890"
    )
    assert user.username == "testuser"
    assert user.email == "testuser@example.com"
    assert user.first_name == "Test"
    assert user.last_name == "User"
    assert user.password == "password123"
    assert user.phone_number == "1234567890"