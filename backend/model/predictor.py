import joblib
import re
import scipy.sparse as sp
import numpy as np
import os

vectorizer = joblib.load("model/vectorizer.pkl")

models = {
    "random_forest": joblib.load("model/model_rf.pkl"),
    "logistic_regression": joblib.load("model/model_logreg.pkl"),
    "naive_bayes": joblib.load("model/model_nb.pkl"),
}

current_model = models["random_forest"]

misinfo_keywords = [
    "shocking", "breaking", "exclusive", "truth", "hoax",
    "exposed", "alert", "urgent", "miracle", "conspiracy", "hidden"
]

def preprocess_text(text: str):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"@\w+", " ", text)
    text = re.sub(r"#\w+", " ", text)
    text = re.sub(r"[^a-z\s?!]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def extract_features(text):
    exclamation_count = text.count("!")
    question_count = text.count("?")
    misinfo_keyword_count = sum(1 for w in misinfo_keywords if w in text)
    return np.array([[exclamation_count, question_count, misinfo_keyword_count]])

def predict_text(input_text: str, model_name: str = "random_forest"):
    print("Received text:", input_text)
    print("Using model:", model_name)

    clean = preprocess_text(input_text)
    X_tfidf = vectorizer.transform([clean])
    extra = extract_features(input_text)
    X = sp.hstack((X_tfidf, extra))

    model = models.get(model_name, models["random_forest"])
    print("Model loaded successfully")

    pred = model.predict(X)[0]
    print("Prediction done")

    label = "Real" if pred == 1 else "Fake"
    print("Label:", label)
    return label

