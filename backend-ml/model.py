from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# -------------------------
# 1. Training data
# -------------------------

texts = [
    "I feel happy today",
    "Everything is going well",
    "I am fine",

    "I feel stressed with university work",
    "I feel anxious",
    "I am struggling to cope",

    "I feel hopeless",
    "I want to hurt myself",
    "I feel like killing myself",
    "I see no point in living"
]

labels = [
    "low", "low", "low",
    "medium", "medium", "medium",
    "high", "high", "high", "high"
]

# -------------------------
# 2. Convert text → numbers (NLP)
# -------------------------

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# -------------------------
# 3. Train ML model
# -------------------------

model = LogisticRegression()
model.fit(X, labels)

# -------------------------
# 4. Prediction function
# -------------------------

def predict_risk(text: str):
    vector = vectorizer.transform([text])
    prediction = model.predict(vector)[0]
    confidence = max(model.predict_proba(vector)[0])
    return prediction, round(confidence, 2)
