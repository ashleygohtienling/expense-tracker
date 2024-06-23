from fastapi import FastAPI, Request, Depends
from fastapi.responses import JSONResponse

from common.auth import get_current_active_user
from api.auth import auth_router
from api.users import user_router
from db.database import SessionLocal
import uvicorn

app = FastAPI()


# Sets up session for each incoming request
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    try:
        # Before entering the endpoint handler stores session in request making it accessible throughout the request handling process.
        request.state.db = SessionLocal()
        # Getting response from endpoint handler
        response = await call_next(request)
    finally:
        # close connection; thereby ensuring that db_session is available throughout the request lifecycle
        request.state.db.close()
    return response


@app.get("/api")
async def root():
    return {"message": "Hello World"}


app.include_router(
    user_router, prefix="/api", dependencies=[Depends(get_current_active_user)]
)
app.include_router(auth_router, prefix="/api")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)
