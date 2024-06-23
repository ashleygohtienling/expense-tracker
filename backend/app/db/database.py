from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import Request
import os


engine = create_engine(
    # "mysql+pymysql://root:{{}}@172.17.0.2:3306/test_db",
    "mysql+pymysql://root:{{}}@localhost:3306/test_db",
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# Dependency
def get_db(request: Request):
    return request.state.db
