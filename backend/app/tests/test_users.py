from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.db import models


def test_create_user(client: TestClient, test_db: Session, user_token_headers: str):
    response = client.post(
        "/api/users",
        json={
            "email": "gohtienling@example.com",
            "password": "test456",
            "scope": "admin",
        },
        headers=user_token_headers,
    )
    assert response.status_code == 200
    created_user = (
        test_db.query(models.User)
        .filter(models.User.email == "test@example.com")
        .first()
    )
    assert created_user is not None
    assert created_user.email == "test@example.com"
    # Additional assertions as needed
