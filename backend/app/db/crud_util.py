from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError


from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()


def create_user(db: Session, user: schemas.UserCreate):
    from common.security import get_hashed_password

    try:
        hashed_password = get_hashed_password(user.password)
        user = set_active_user(user)
        user = user.dict()
        user["hashed_password"] = hashed_password
        del user["password"]
        new_user = models.User(**user)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"user_id": new_user.user_id}
    except IntegrityError as error:
        db.rollback()
        raise HTTPException(
            detail=f"Failed to create new user. {error}",
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as error:
        db.rollback()
        return HTTPException(
            detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User not found"
        )
    try:
        db.delete(user)
        db.commit()
        return {"user_id": user.user_id}
    except Exception as error:
        raise HTTPException(
            detail=f"Failed to delete user. {error}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def get_user_by_email(db: Session, email: str) -> schemas.UserBase:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def edit_user(db: Session, user_id: int, user_edit: schemas.UserEdit) -> schemas.User:
    from common.security import get_hashed_password

    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    update_data = user_edit.dict()
    if "password" in update_data:
        update_data = update_data["hashed_password"] = get_hashed_password(
            update_data.password
        )
        del update_data["password"]

    for key, value in update_data.items():
        setattr(db_user, key, value)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def set_active_user(user):
    user.is_active = True
    return user
