from fastapi import APIRouter, Depends
from app.model.model import UserModel as UserMod
from sqlalchemy.orm import Session
from app.database import db_models, start_db

router = APIRouter()


@router.post("/users")
async def create_user(user: UserMod, db: Session = Depends(start_db.get_db)):
    user_data = db_models.User(email=user.email, username=user.username,
                               first_name=user.first_name, last_name=user.last_name, hashed_password=user.password,
                               phone_number=user.phone_number)
    db.add(user_data)
    db.commit()
    return {"message": "User has been added successfully"}


@router.get("/users")
async def get_all_users(db: Session = Depends(start_db.get_db)):
    users_data = db.query(db_models.User).all()

    return {"users_data": users_data}
