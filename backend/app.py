import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class Data(BaseModel):
    key: str
    value: str

@app.post("/data/")
async def create_data(data: Data):
    DATA_STORE.append(data.dict())
    return {"message": "Data created successfully"}

@app.get("/data/")
async def read_data():
    return DATA_STORE

@app.post("/reset")
async def reset_data():
    global DATA_STORE
    DATA_STORE = []
    return {"message": "Data reset successfully"}

@app.get("/stats/")
async def read_stats():
    return {"data_count": len(DATA_STORE)}

@app.post("/submit/")
async def submit_data(data: Data):
    DATA_STORE.append(data.dict())
    return {"message": "Data submitted successfully"}

@app.get("/logs/")
async def read_logs():
    return DATA_STORE