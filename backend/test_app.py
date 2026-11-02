import pytest
from fastapi.testclient import TestClient
from app import app

@pytest.fixture(autouse=True)
def reset_data():
    client = TestClient(app)
    client.post("/reset")

def test_get_data():
    client = TestClient(app)
    response = client.get("/data")
    assert response.status_code == 200
    assert response.json() == []

def test_post_data():
    client = TestClient(app)
    data = {"key": "value"}
    response = client.post("/data", json=data)
    assert response.status_code == 200
    assert response.json() == {"message": "Data added successfully"}

def test_get_status():
    client = TestClient(app)
    response = client.get("/status")
    assert response.status_code == 200
    assert response.json() == {"status": "OK"}

def test_get_metrics():
    client = TestClient(app)
    response = client.get("/metrics")
    assert response.status_code == 200
    assert response.json() == {"metrics": "OK"}

def test_submit_data():
    client = TestClient(app)
    data = {"key": "value"}
    response = client.post("/submit", json=data)
    assert response.status_code == 200
    assert response.json() == {"message": "Data submitted successfully"}

def test_get_logs():
    client = TestClient(app)
    response = client.get("/logs")
    assert response.status_code == 200
    assert response.json() == {"logs": []}

def test_get_stats():
    client = TestClient(app)
    response = client.get("/stats")
    assert response.status_code == 200
    assert response.json() == {"stats": 0}

def test_post_reset():
    client = TestClient(app)
    data = {"key": "value"}
    client.post("/data", json=data)
    response = client.post("/reset")
    assert response.status_code == 200
    assert response.json() == {"message": "Data reset successfully"}
    response = client.get("/data")
    assert response.status_code == 200
    assert response.json() == []