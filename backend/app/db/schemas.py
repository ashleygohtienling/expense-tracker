from typing import Union, Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    first_name: Optional[str] = None
    fullname: Optional[str] = None
    is_active: Optional[bool] = False
    scope: Optional[str]


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class UserEdit(UserBase):
    password: Optional[str] = None

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
    scope: str = "user"
    exp: str
