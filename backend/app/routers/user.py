from fastapi import APIRouter, Depends, Form, HTTPException, status
from app.model.model import UserModel as UserMod
from sqlalchemy.orm import Session
from app.database import db_models, start_db
from utils.user_login_model import UserLoginModel

from typing import Annotated

router = APIRouter(
    prefix="/api",
    tags=["User"]
)


@router.get("/user", status_code=status.HTTP_200_OK)
async def get_all_users(db: Annotated[Session, Depends(start_db.get_db)]):
    users_data = db.query(db_models.User).all()

    return {"data": users_data}


@router.post("/user/login", status_code=status.HTTP_200_OK)
async def get_user_by_email_and_password(data: Annotated[UserLoginModel, Form()], db: Annotated[Session, Depends(start_db.get_db)]):
    if data.username is None and data.password is None:
        return {"message": "Please provide username and password"}

    user = db.query(db_models.User).filter(db_models.User.username == data.username).first()

    if user is None:
        return HTTPException(status_code=404, detail="User not found", headers={"X-Username": "Username not Found"})

    if user.hashed_password != data.password:
        return HTTPException(status_code=404, detail="Invalid password", headers={"X-Password": "Password is incorrect"})

    return {"data": user}


@router.post("/user/signup", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserMod, db: Annotated[Session, Depends(start_db.get_db)]):
    user_data = db_models.User(email=user.email, username=user.username,
                               first_name=user.first_name, last_name=user.last_name, hashed_password=user.password,
                               phone_number=user.phone_number)
    db.add(user_data)
    db.commit()
    return {"message": "User has been added successfully"}
