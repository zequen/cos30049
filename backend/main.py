from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model.predictor import predict_text
from fastapi import FastAPI, HTTPException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    text: str
    model: str = "random_forest" #default set to random forest

@app.get("/")
def root():
    return {"message": "API is running"}

@app.post("/predict")
def predict(data: InputData):
    try:
        if not data.text.strip():
            raise HTTPException(status_code=400, detail="Input text cannot be empty.")
        
        result = predict_text(data.text, model_name=data.model)
        return {"prediction": result}
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=f"Model or vectorizer file missing: {e}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
