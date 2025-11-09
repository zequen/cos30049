from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model.predictor import predict_text, get_keyword_frequencies

# create fastapi application instance
app = FastAPI()

# add cors middleware to allow frontend requests from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # react default port
    allow_credentials=True,
    allow_methods=["*"],  # allow all http methods
    allow_headers=["*"],  # allow all headers
)

# define input data model for prediction endpoint
class InputData(BaseModel):
    text: str

# root endpoint to check if api is running
@app.get("/")
def root():
    return {"message": "API is running"}

# prediction endpoint that accepts text and returns classification result with keyword data
@app.post("/predict")
def predict(data: InputData):
    prediction = predict_text(data.text)
    keywords = get_keyword_frequencies(data.text)
    return {
        "prediction": prediction,
        "keywords": keywords
    }