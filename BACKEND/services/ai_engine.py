import os
from dotenv import load_dotenv
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
from rapidfuzz import process


def classify_intent(text):

    text = text.lower()

    if (
        "becha" in text
        or "bechi" in text
        or "बेचा" in text
        or "बेची" in text
        or "बेचे" in text
        or "sold" in text
        or "sell" in text
        or "ಮಾರಾಟ" in text  # Kannada: sale
        or "ವಿಕ್ರಯ" in text
        or "விற்ற" in text  # Tamil: sold
        or "விற்ப" in text
    ):
        return "SALES"

    elif (
        "loan" in text
        or "karz" in text
        or "कर्ज" in text
        or "ऋण" in text
        or "ಕಡನ್" in text
        or "கடன்" in text
    ):
        return "LOAN_REQUEST"

    elif (
        "price" in text
        or "bhav" in text
        or "भाव" in text
        or "ಬೆಲೆ" in text
        or "விலை" in text
    ):
        return "PRICE_QUERY"

    return "UNKNOWN"


def normalize_product(product):

    if not product:
        return None

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

    match = process.extractOne(product, products.keys())

    if not match:
        return product

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