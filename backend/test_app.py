import pytest
from fastapi.testclient import TestClient
from app import app

@pytest.fixture(autouse=True)
def reset_data():
    client = TestClient(app)
    client.post("/reset")

def test_create_data():
    client = TestClient(app)
    response = client.post("/data/", json={"key": "test_key", "value": "test_value"})
    assert response.status_code == 200
    assert response.json() == {"message": "Data created successfully"}

def test_read_data():
    client = TestClient(app)
    client.post("/data/", json={"key": "test_key", "value": "test_value"})
    response = client.get("/data/")
    assert response.status_code == 200
    assert response.json() == [{"key": "test_key", "value": "test_value"}]

def test_reset_data():
    client = TestClient(app)
    client.post("/data/", json={"key": "test_key", "value": "test_value"})
    response = client.post("/reset")
    assert response.status_code == 200
    assert response.json() == {"message": "Data reset successfully"}
    response = client.get("/data/")
    assert response.status_code == 200
    assert response.json() == []

def test_read_stats():
    client = TestClient(app)
    client.post("/data/", json={"key": "test_key", "value": "test_value"})
    response = client.get("/stats/")
    assert response.status_code == 200
    assert response.json() == {"data_count": 1}

def test_submit_data():
    client = TestClient(app)
    response = client.post("/submit/", json={"key": "test_key", "value": "test_value"})
    assert response.status_code == 200
    assert response.json() == {"message": "Data submitted successfully"}

def test_read_logs():
    client = TestClient(app)
    client.post("/data/", json={"key": "test_key", "value": "test_value"})
    response = client.get("/logs/")
    assert response.status_code == 200
    assert response.json() == [{"key": "test_key", "value": "test_value"}]

def test_invalid_data():
    client = TestClient(app)
    response = client.post("/data/", json={"invalid_key": "test_value"})
    assert response.status_code == 422

def test_empty_data():
    client = TestClient(app)
    response = client.post("/data/", json={})
    assert response.status_code == 422