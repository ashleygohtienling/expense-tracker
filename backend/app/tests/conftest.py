import pytest
from app.db import models
from app.main import app
from fastapi.testclient import TestClient

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db.database import get_db


@pytest.fixture(scope="session")
def test_db():
    engine = create_engine(
        "mysql+pymysql://root:{{}}@localhost:3306/test_db",
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = TestingSessionLocal()
    models.Base.metadata.create_all(bind=engine)
    yield db
    db.close()


@pytest.fixture
def client(test_db):
    def get_test_db():
        yield test_db

    app.dependency_overrides[get_db] = get_test_db
    yield TestClient(app)


@pytest.fixture
def user_token_headers(client: TestClient):
    response = client.post(
        "api/signup", json={"email": "test@example.com", "password": "password123"}
    )

    assert response.status_code == 200

    tokens = response.json()

    assert tokens.token_type == "Bearer"
    assert tokens.access_token is not None

    return {"Authorization": f"Bearer {tokens.access_token}"}
