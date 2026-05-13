import os
from dotenv import load_dotenv
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
from rapidfuzz import process


def classify_intent(text):

    text = text.lower()

    if "becha" in text or "sold" in text:
        return "SALES"

    elif "loan" in text or "karz" in text:
        return "LOAN_REQUEST"

    elif "price" in text or "bhav" in text:
        return "PRICE_QUERY"

    return "UNKNOWN"


def normalize_product(product):

    products = {
        "aloo": "potato",
        "aalu": "potato",
        "potato": "potato",
        "tamatar": "tomato",
        "tomato": "tomato",
        "pyaz": "onion",
        "onion": "onion",
        "mango": "mango"
    }

    match = process.extractOne(
        product,
        products.keys()
    )

    return products[match[0]]


def fraud_check(quantity):

    if quantity > 300:
        return "ANOMALY"

    return "NORMAL"


def predict_demand(product):

    fake_predictions = {
        "potato": 120,
        "tomato": 90,
        "onion": 150,
        "mango": 70
    }

    return fake_predictions.get(product, 50)