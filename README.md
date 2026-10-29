# ram-weather-optimizer-pro-max-plus
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python: 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React: 18+](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## Executive Overview
The ram-weather-optimizer-pro-max-plus project aims to optimize Windows 11 Weather app RAM usage with real-time metrics & interactive dashboards. This project utilizes FastAPI, Python, React (Vite), and TailwindCSS to provide a comprehensive solution.

## Feature Breakdown
* Real-time metrics and interactive dashboards for Windows 11 Weather app RAM usage
* FastAPI backend for handling API requests and storing data in-memory
* React frontend with Vite and TailwindCSS for a modern and responsive UI
* CORS enabled for local communication between frontend and backend

## API Contract Summary
The API provides the following endpoints:
* `POST /data`: Submit data to the in-memory store
* `GET /data`: Retrieve data from the in-memory store
* `POST /reset`: Reset the in-memory data store

## End-to-End System Architecture Flow Diagram
```mermaid
graph LR
    A[User] -->|Interacts with Weather app| B[Windows 11 Weather app]
    B -->|Sends RAM usage data| C[React Frontend]
    C -->|Submits data to API| D[FastAPI Backend]
    D -->|Stores data in-memory| E[In-Memory Data Store]
    E -->|Provides data to API| D
    D -->|Returns data to frontend| C
    C -->|Displays data in dashboard| A
    D -->|Resets data store| E
    E -->|Clears data| D
```

## Step-by-Step Commands to Run the Project
### Backend
1. Install packages: `pip install -r requirements.txt`
2. Start the backend: `uvicorn backend.app:app --reload --port 8000`

### Frontend
1. Change directory to frontend: `cd frontend`
2. Install packages: `npm install`
3. Start the frontend: `npm run dev`

### CORS
CORS (Cross-Origin Resource Sharing) allows the React frontend to communicate with the FastAPI backend, even though they are running on different ports. This is enabled in the FastAPI backend using the `CORSMiddleware`.

## How to Contribute
Contributions are welcome! Please submit a pull request with your changes and a brief description of what you've added or fixed.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.