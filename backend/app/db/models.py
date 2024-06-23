from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "User"

    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    fullname = Column(String)
    hashed_password = Column(String, nullable=False)
    scope = Column(String)
    is_active = Column(String)
