from common.security import verify_password, oauth2_scheme, SECRET_KEY, ALGORITHM
from db.crud_util import get_user_by_email
from typing import Optional, Union
from db import schemas, models, database, crud_util
from fastapi import Depends, status, HTTPException
from sqlalchemy.orm import Session
import jwt
from jwt import PyJWTError
from datetime import datetime


def authenticate_user(
    db, username: str, password: str
) -> Union[schemas.UserBase, bool]:
    user = get_user_by_email(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def get_current_user(
    db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)
):
    status_code = status.HTTP_401_UNAUTHORIZED
    try:
        payload = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        print("decoded token", payload)
        email: str = payload.get("sub")
        if email is None:
            raise auth_exception("Could not validate credentials", status_code)
        exp: str = payload.get("exp")
        if datetime.fromtimestamp(exp) < datetime.now():
            raise auth_exception("Token has expired", status_code)
    except PyJWTError:
        raise auth_exception("Could not validate credentials", status_code)

    user = crud_util.get_user_by_email(db, email)
    if user is None:
        raise auth_exception("Could not validate credentials", status_code)
    return user


def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not current_user.is_active:
        raise auth_exception("User in inactive", status.HTTP_400_BAD_REQUEST)
    return current_user


def auth_exception(detail: str, status_code: status):
    return HTTPException(
        status_code=status_code,
        detail=detail,
        headers={"WWW-Authenticate": "Bearer"},
    )
