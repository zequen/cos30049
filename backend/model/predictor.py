import joblib
import re
import scipy.sparse as sp
import numpy as np
import os
from .keywords import MISINFO_KEYWORDS

vectorizer = joblib.load("model/vectorizer.pkl")

models = {
    "random_forest": joblib.load("model/model_rf.pkl"),
    "logistic_regression": joblib.load("model/model_logreg.pkl"),
    "naive_bayes": joblib.load("model/model_nb.pkl"),
}

current_model = models["random_forest"]

def preprocess_text(text: str):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"@\w+", " ", text)
    text = re.sub(r"#\w+", " ", text)
    text = re.sub(r"[^a-z\s?!']", " ", text)  # keep apostrophes for contractions
    text = re.sub(r"\s+", " ", text).strip()
    return text

def count_keyword_with_boundaries(text: str, keyword: str) -> int:
    """count keyword occurrences using word boundaries to avoid partial matches"""
    # escape special regex characters in keyword
    escaped_keyword = re.escape(keyword)
    # use word boundaries \b to match whole words/phrases only
    pattern = r'\b' + escaped_keyword + r'\b'
    matches = re.findall(pattern, text, re.IGNORECASE)
    return len(matches)

def extract_features(text):
    exclamation_count = text.count("!")
    question_count = text.count("?")
    clean_text = preprocess_text(text)

    # count keywords using word boundaries
    misinfo_keyword_count = sum(
        count_keyword_with_boundaries(clean_text, keyword)
        for keyword in MISINFO_KEYWORDS
    )

    return np.array([[exclamation_count, question_count, misinfo_keyword_count]])

def get_keyword_frequencies(text: str):
    """extract keyword frequencies from text for visualization"""
    clean = preprocess_text(text)
    keyword_counts = {}

    for keyword in MISINFO_KEYWORDS:
        count = count_keyword_with_boundaries(clean, keyword)
        if count > 0:
            keyword_counts[keyword] = count

    return keyword_counts

def predict_text(input_text: str, model_name: str = "random_forest"):
    print("received text:", input_text)
    print("using model:", model_name)

    clean = preprocess_text(input_text)
    X_tfidf = vectorizer.transform([clean])
    extra = extract_features(input_text)
    X = sp.hstack((X_tfidf, extra))

    model = models.get(model_name, models["random_forest"])
    print("model loaded successfully")

    pred = model.predict(X)[0]
    print("prediction done")

    label = "Real" if pred == 1 else "Fake"
    print("label:", label)
    return label