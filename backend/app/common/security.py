from passlib.context import CryptContext
from typing import Union
from datetime import datetime, timedelta
import jwt
from db.crud_util import create_user, get_user_by_email
from db.schemas import UserCreate
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def get_hashed_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> str:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    try:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=15)

        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except Exception as e:
        print(e)


def signup_user(db, formData):
    email = formData.username
    user = get_user_by_email(db, email)
    if user:
        raise HTTPException(
            detail="User exists, please log in again",
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    formData = formData.dict()
    return create_user(db, UserCreate(**formData))
