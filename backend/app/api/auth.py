from fastapi import (
    APIRouter,
    Path,
    Query,
    Request,
    Depends,
    HTTPException,
    status,
)
from db.database import get_db
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from common.auth import authenticate_user
from common.security import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    signup_user,
)
from datetime import timedelta
import os


auth_router = APIRouter()


@auth_router.post("/token")
async def get_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    username = form_data.username
    password = form_data.password
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect name or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "scope": user.scope, "exp": access_token_expires},
        expires_delta=access_token_expires,
    )

    print(access_token)
    return {"access_token": access_token, "token_type": "Bearer"}


@auth_router.post("/signup")
async def signup(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = signup_user(db, form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect name or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "scope": user.scope, "exp": access_token_expires},
        expires_delta=access_token_expires,
    )

    print(access_token)
    return {"access_token": access_token, "token_type": "Bearer"}
