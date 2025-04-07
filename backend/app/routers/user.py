from fastapi import APIRouter, Depends, Form, HTTPException, status
from app.model.model import UserModel as UserMod
from sqlalchemy.orm import Session
from app.database import db_models, start_db
from utils.user_login_model import UserLoginModel
from utils.password_hash import get_password_hash, verify_password

from typing import Annotated

router = APIRouter(
    prefix="/api",
    tags=["User"]
)


@router.get("/user", status_code=status.HTTP_200_OK)
async def get_all_users(db: Annotated[Session, Depends(start_db.get_db)]):
    users_data = db.query(db_models.User).all()

    return {"data": users_data}


@router.get("/user/{user_id}", status_code=status.HTTP_200_OK)
async def get_user_by_id(user_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    user = db.query(db_models.User).filter(
        db_models.User.id == user_id).first()

    if user is None:
        return HTTPException(status_code=404, detail="User not found", headers={"X-User": "User not Found"})

    return {"data": user}


@router.post("/user/login", status_code=status.HTTP_200_OK)
async def login_user_by_username_and_password(data: UserLoginModel, db: Annotated[Session, Depends(start_db.get_db)]):
    if data.username is None and data.password is None:
        return {"message": "Please provide username and password"}

    user = db.query(db_models.User).filter(
        db_models.User.username == data.username).first()

    if user is None:
        return HTTPException(status_code=404, detail="User not found", headers={"X-Username": "Username not Found"})

    user_hash_password = get_password_hash(data.password)

    if verify_password(data.password, user_hash_password) is False:
        return HTTPException(status_code=404, detail="Invalid password", headers={"X-Password": "Password is incorrect"})

    return {"data": {"username": user.username, "email": user.email, "first_name": user.first_name, "last_name": user.last_name,
                     "phone_number": user.phone_number}}


@router.post("/user/signup", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserMod, db: Annotated[Session, Depends(start_db.get_db)]):
    user_hash_password = get_password_hash(user.password)
    user_data = db_models.User(email=user.email, username=user.username,
                               first_name=user.first_name, last_name=user.last_name, hashed_password=user_hash_password,
                               phone_number=user.phone_number)
    db.add(user_data)
    db.commit()

    return {"message": "User has been added successfully"}


@router.patch("/user", status_code=status.HTTP_200_OK)
async def edit_user_by_id(user: UserMod, db: Annotated[Session, Depends(start_db.get_db)]):
    user_data = db.query(db_models.User).filter(
        db_models.User.username == user.username).first()

    if user_data is None:
        return HTTPException(status_code=404, detail="User not found", headers={"X-Username": "Username not Found"})

    user_data.email = user.email
    user_data.username = user.username
    user_data.first_name = user.first_name
    user_data.last_name = user.last_name
    user_data.hashed_password = user.password
    user_data.phone_number = user.phone_number

    db.add(user_data)
    db.commit()

    return {"message": "User has been updated successfully"}


@router.delete("/user/{user_id}", status_code=status.HTTP_200_OK)
async def delete_user_by_id(user_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    user_data = db.query(db_models.User).filter(
        db_models.User.id == user_id).first()

    if user_data is None:
        return HTTPException(status_code=404, detail="User not found", headers={"X-User": "User not Found"})

    db.query(db_models.User).filter(
        db_models.User.id == user_id).delete()
    db.commit()

    return {"message": "User has been deleted successfully"}
