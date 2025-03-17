import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.db_models import Base, User

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

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
    user = User(
        email="testuser@example.com",
        username="testuser",
        first_name="Test",
        last_name="User",
        hashed_password="password123",
        phone_number="1234567890"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    assert user.id is not None
    assert user.email == "testuser@example.com"