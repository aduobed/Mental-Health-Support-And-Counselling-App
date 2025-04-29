from fastapi import APIRouter, Depends, Form, HTTPException, status
from app.model.model import UserModel as UserMod
from sqlalchemy.orm import Session
from app.database import db_models, start_db
from utils.user_login_model import UserLoginModel, UserResponseModel
from utils.password_hash import get_password_hash, verify_password

from typing import Annotated, List

router = APIRouter(
    prefix="/api",
    tags=["User"]
)


@router.get("/user", status_code=status.HTTP_200_OK, response_model=List[UserResponseModel])
async def get_all_users(db: Annotated[Session, Depends(start_db.get_db)]):
    users_data = db.query(db_models.User).all()
    return users_data


@router.get("/user/{user_id}", status_code=status.HTTP_200_OK, response_model=UserResponseModel)
async def get_user_by_id(user_id: int, db: Annotated[Session, Depends(start_db.get_db)]):
    user = db.query(db_models.User).filter(
        db_models.User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found", headers={
                            "X-User": "User not Found"})

    return user


@router.post("/user/login", status_code=status.HTTP_200_OK, response_model=UserResponseModel)
async def login_user_by_username_and_password(data: UserLoginModel, db: Annotated[Session, Depends(start_db.get_db)]):
    if data.username is None and data.password is None:
        return {"message": "Please provide username and password"}

    user = db.query(db_models.User).filter(
        db_models.User.username == data.username).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found", headers={
                            "X-Username": "Username not Found"})

    user_hash_password = get_password_hash(data.password)

    if verify_password(data.password, user_hash_password) is False:
        raise HTTPException(status_code=404, detail="Invalid password", headers={
                            "X-Password": "Password is incorrect"})

    return user


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
        raise HTTPException(status_code=404, detail="User not found", headers={
                            "X-Username": "Username not Found"})

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
        raise HTTPException(status_code=404, detail="User not found", headers={
                            "X-User": "User not Found"})

    db.query(db_models.User).filter(
        db_models.User.id == user_id).delete()
    db.commit()

    return {"message": "User has been deleted successfully"}
