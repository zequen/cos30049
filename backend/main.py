from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model.predictor import predict_text, get_keyword_frequencies
from fastapi import FastAPI, HTTPException

# create fastapi application instance
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # allow all http methods
    allow_headers=["*"],  # allow all headers
)

# define input data model for prediction endpoint
class InputData(BaseModel):
    text: str
    model: str = "random_forest" #default set to random forest

# root endpoint to check if api is running
@app.get("/")
def root():
    return {"message": "API is running"}

# prediction endpoint that accepts text and returns classification result with keyword data
@app.post("/predict")
def predict(data: InputData):
    prediction = predict_text(data.text, model_name=data.model)
    keywords = get_keyword_frequencies(data.text)
    return {
        "prediction": prediction,
        "model_used": data.model,
        "keywords": keywords
    }
