# Mental Health Chatbot – Prototype

This repository contains an academic prototype consisting of:
- A web-based frontend (HTML, CSS, JavaScript)
- A machine learning backend API (Python, FastAPI)

## Requirements
- Python 3.9 or later
- pip
- A modern web browser

## How to Run the Prototype

### 1) Start the Machine Learning Backend

From a terminal:

    cd backend-ml
    python -m venv venv
    source venv/bin/activate
    uvicorn server:app --reload

The backend API will run at:
    http://127.0.0.1:8000

To verify it is running, open:
    http://127.0.0.1:8000/docs

### 2) Start the Frontend (Choose ONE method)

The frontend must be served over HTTP.

Option A — Live Server (VS Code)
1. Open the project folder in VS Code
2. Open index.html
3. Right-click anywhere in the file
4. Select “Open with Live Server”

The site will open automatically at:
    http://127.0.0.1:5500

Option B — Python HTTP Server (No VS Code required)
From the project root (where index.html is located), run:

    python -m http.server 5500

Then open a browser and go to:
    http://127.0.0.1:5500

IMPORTANT:
Do NOT open HTML files using file:// paths. Browser security restrictions will prevent the chatbot from functioning correctly.

## Author
Callum Walters
