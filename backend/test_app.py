import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_data():
    response = client.post("/reset")
    assert response.status_code == 200
    assert response.json() == {"message": "Data reset successfully"}

def test_create_data():
    response = client.post("/data/", json={"key": "some_key", "value": "some_value"})
    assert response.status_code == 200
    assert response.json() == {"message": "Data created successfully"}

def test_read_data():
    client.post("/data/", json={"key": "some_key", "value": "some_value"})
    response = client.get("/data/")
    assert response.status_code == 200
    assert response.json() == [{"key": "some_key", "value": "some_value"}]

def test_reset_data():
    client.post("/data/", json={"key": "some_key", "value": "some_value"})
    response = client.post("/reset")
    assert response.status_code == 200
    assert response.json() == {"message": "Data reset successfully"}
    response = client.get("/data/")
    assert response.status_code == 200
    assert response.json() == []

def test_get_status():
    response = client.get("/status")
    assert response.status_code == 200
    assert response.json() == {"status": "OK"}

def test_get_metrics():
    response = client.get("/metrics")
    assert response.status_code == 200
    assert response.json() == {"metrics": "OK"}

def test_submit_data():
    response = client.post("/submit", json={"key": "some_key", "value": "some_value"})
    assert response.status_code == 200
    assert response.json() == {"message": "Data submitted successfully"}

def test_get_logs():
    response = client.get("/logs")
    assert response.status_code == 200
    assert response.json() == {"logs": "OK"}

def test_get_visualizer():
    response = client.get("/visualizer")
    assert response.status_code == 200
    assert response.json() == {"visualizer": "OK"}

def test_create_data_invalid_json():
    response = client.post("/data/", json={"invalid": "json"})
    assert response.status_code == 422

def test_submit_data_invalid_json():
    response = client.post("/submit", json={"invalid": "json"})
    assert response.status_code == 422