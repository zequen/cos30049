from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model.predictor import predict_text

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "API is running"}

@app.post("/predict")
def predict(data: InputData):
    return {"prediction": predict_text(data.text)}