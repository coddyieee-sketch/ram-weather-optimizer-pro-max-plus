# ram-weather-optimizer-pro-max-plus
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python: 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React: 18+](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## Executive Overview
The ram-weather-optimizer-pro-max-plus project aims to optimize Windows 11's built-in Weather app RAM usage with real-time metrics and interactive dashboards. This project utilizes a FastAPI backend, a React frontend, and Tailwind CSS for styling.

## Feature Breakdown
- Real-time RAM usage metrics
- Interactive dashboards for data visualization
- FastAPI backend for handling API requests
- React frontend for user interaction
- Tailwind CSS for styling and layout

## API Contract Summary
The API consists of the following endpoints:
- `POST /data`: Submit new data to the in-memory store
- `GET /data`: Retrieve all data from the in-memory store
- `POST /reset`: Reset the in-memory data store

## End-to-End System Architecture Flow Diagram
```mermaid
graph LR
    A[User] -->|Interact with Frontend| B[React Frontend]
    B -->|Submit Data| C[FastAPI Backend]
    C -->|Process Data| D[In-Memory Data Store]
    D -->|Store Data| D
    B -->|Request Data| C
    C -->|Retrieve Data| D
    D -->|Return Data| C
    C -->|Return Data| B
    B -->|Display Data| A
    C -->|Reset Data| D
    D -->|Clear Data| D
```

## Step-by-Step Commands
### Backend
1. Install packages: `pip install -r requirements.txt`
2. Start the backend: `uvicorn backend.app:app --reload --port 8000`

### Frontend
1. Change directory: `cd frontend`
2. Install packages: `npm install`
3. Start the frontend: `npm run dev`

## CORS Explanation
CORS (Cross-Origin Resource Sharing) allows the React frontend to make requests to the FastAPI backend, which is running on a different port. This is necessary because web browsers enforce same-origin policy, which prevents a web page from making requests to a different origin (domain, protocol, or port) than the one it was loaded from. By configuring CORS in the FastAPI backend, we can allow the React frontend to make requests to the backend, enabling local communication between the two.

## Running the Project
To run the project, follow the step-by-step commands above. The React frontend will be available at `http://localhost:5173`, and the FastAPI backend will be available at `http://localhost:8000`. The frontend will make requests to the backend to retrieve and submit data, and the backend will process and store the data in the in-memory data store.