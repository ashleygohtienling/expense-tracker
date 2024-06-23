from fastapi import APIRouter, Path, Query, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from db.crud_util import create_user, delete_user
from db.schemas import User, UserCreate
from db.database import get_db

user_router = APIRouter()


@user_router.get("/")
async def root():
    return {"message": "Hello world"}


# Dependency function here is used to extract session from request and pass in as an argument
@user_router.post("/users")
async def user_create(
    request: Request, user: UserCreate, db: Session = Depends(get_db)
):
    return create_user(db, user)


@user_router.delete("/users/{user_id}")
async def user_delete(request: Request, user_id: int, db: Session = Depends(get_db)):
    return delete_user(db, user_id)
