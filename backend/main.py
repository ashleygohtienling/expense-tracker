from fastapi import FastAPI
from database import MySQLConnection
from dotenv import load_dotenv
import os

# Load environment variables from .env file into os
load_dotenv()

# Accessing environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
port = os.getenv("PORT")
database = os.getenv("DATABASE")
table = os.getenv("USER_TABLE")

app = FastAPI()

mysql_connection = MySQLConnection()
mysql_connection.connect(
    host=db_host, 
    port=port, 
    user=db_user, 
    password=db_password, 
    database=database
)

@app.get("/")
async def root():
    return {"message": "Hello world"}

@app.get("/get")
def select_all():
    query= f"SELECT * FROM {table}"
    results = mysql_connection.execute_query(query)
    return {"data": results}

@app.on_event("shutdown")
def shutdown_event():
    mysql_connection.close_conn()
