import pandas as pd
import re
import scipy.sparse as sp
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

# ---------- 1. Load Datasets ----------
fake_df = pd.read_csv("data/Fake.csv")
real_df = pd.read_csv("data/True.csv")

fake_df["label"] = 0
real_df["label"] = 1
kaggle_df = pd.concat([fake_df, real_df], ignore_index=True)

if "text" in kaggle_df.columns:
    kaggle_df = kaggle_df.rename(columns={"text": "tweet"})
elif "content" in kaggle_df.columns:
    kaggle_df = kaggle_df.rename(columns={"content": "tweet"})
kaggle_df["id"] = range(len(kaggle_df))

constraint_train = pd.read_excel("data/Constraint_English_Train.xlsx")
constraint_val   = pd.read_excel("data/Constraint_English_Val.xlsx")
constraint_test  = pd.read_excel("data/Constraint_English_Test.xlsx")

for df in [constraint_train, constraint_val, constraint_test]:
    df["label"] = df["label"].map({"real": 1, "fake": 0, True: 1, False: 0})
    if "id" not in df.columns:
        df["id"] = range(len(df))

# ---------- 2. Merge Kaggle + Constraint Train for Training + Cleaning ----------
train_df = constraint_train.copy()
val_df   = constraint_val.copy()
test_df  = constraint_test.copy()

# ---------- 3. Clean Data ----------

def clean_dataframe(df):
    df = df.dropna(subset=["tweet", "label"]).copy()
    df = df.drop_duplicates(subset="id")
    df["label"] = df["label"].astype(int)
    return df

train_df = clean_dataframe(train_df)
val_df   = clean_dataframe(val_df)
test_df  = clean_dataframe(test_df)

# ---------- 4. Text Normalization ----------
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"@\w+", " ", text)
    text = re.sub(r"#\w+", " ", text)
    text = re.sub(r"[^a-z\s?!]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

for df in [train_df, val_df, test_df]:
    df["clean_tweet"] = df["tweet"].apply(preprocess_text)

# ---------- 5. Add Custom Features ----------
misinfo_keywords = [
    "shocking", "breaking", "exclusive", "truth", "hoax",
    "exposed", "alert", "urgent", "miracle", "conspiracy", "hidden"
]

def extract_features(df):
    df["exclamation_count"] = df["tweet"].str.count("!").fillna(0)
    df["question_count"] = df["tweet"].str.count(r"\?").fillna(0)
    df["misinfo_keyword_count"] = df["clean_tweet"].apply(
        lambda x: sum(1 for word in misinfo_keywords if word in x)
    )
    return df

train_df = extract_features(train_df)
val_df   = extract_features(val_df)
test_df  = extract_features(test_df)

# ---------- 6. TF-IDF Feature Extraction ----------
vectorizer = TfidfVectorizer(max_features=5000)
X_train_text = vectorizer.fit_transform(train_df["clean_tweet"])
X_val_text   = vectorizer.transform(val_df["clean_tweet"])
X_test_text  = vectorizer.transform(test_df["clean_tweet"])

def combine_features(X_text, df):
    extra_features = df[["exclamation_count", "question_count", "misinfo_keyword_count"]].values
    return sp.hstack((X_text, extra_features))

X_train = combine_features(X_train_text, train_df)
X_val   = combine_features(X_val_text, val_df)
X_test  = combine_features(X_test_text, test_df)

y_train = train_df["label"]
y_val   = val_df["label"]
y_test  = test_df["label"]

# ---------- 8. Train Models ----------
models = {
    "logreg": LogisticRegression(max_iter=1000),
    "rf": RandomForestClassifier(n_estimators=200, random_state=42),
    "nb": MultinomialNB()
}

accuracy_summary = {}

for name, model in models.items():
    print(f"\nTraining {name.upper()} model...")
    model.fit(X_train, y_train)
    preds = model.predict(X_val)
    acc = accuracy_score(y_val, preds)
    accuracy_summary[name] = acc
    joblib.dump(model, f"model_{name}.pkl")
    print(f" {name.upper()} saved as model_{name}.pkl | Validation Accuracy: {acc:.4f}")

# ---------- 9. Save Shared Vectorizer ----------
joblib.dump(vectorizer, "vectorizer.pkl")
print("\n Vectorizer saved as vectorizer.pkl")

# ---------- 10. Summary ----------
print("\n===== MODEL TRAINING COMPLETE =====")
for name, acc in accuracy_summary.items():
    print(f"{name.upper()} Accuracy: {acc:.4f}")
