from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_risk

app = FastAPI()

# ✅ ADD THIS BLOCK (CORS FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.post("/predict")
def predict(message: Message):
    risk, confidence = predict_risk(message.text)
    return {
        "risk": risk,
        "confidence": confidence
    }

