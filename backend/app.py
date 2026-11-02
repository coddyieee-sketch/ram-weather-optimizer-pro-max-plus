import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_STORE = []

@app.get("/data")
async def get_data():
    return DATA_STORE

@app.post("/data")
async def post_data(data: dict):
    DATA_STORE.append(data)
    return {"message": "Data added successfully"}

@app.post("/reset")
async def reset_data():
    global DATA_STORE
    DATA_STORE = []
    return {"message": "Data reset successfully"}

@app.get("/status")
async def get_status():
    return {"status": "OK"}

@app.get("/metrics")
async def get_metrics():
    return {"metrics": "OK"}

@app.post("/submit")
async def submit_data(data: dict):
    DATA_STORE.append(data)
    return {"message": "Data submitted successfully"}

@app.get("/logs")
async def get_logs():
    return {"logs": DATA_STORE}

@app.get("/stats")
async def get_stats():
    return {"stats": len(DATA_STORE)}