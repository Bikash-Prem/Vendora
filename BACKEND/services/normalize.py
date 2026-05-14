import re


NUMBER_WORDS = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,

    "ek": 1,
    "do": 2,
    "teen": 3,
    "char": 4,
    "chaar": 4,
    "paanch": 5,
    "cheh": 6,
    "saat": 7,
    "aath": 8,
    "nau": 9,
    "das": 10,

    "bees": 20,
    "tees": 30,
    "chalis": 40,
    "pachaas": 50,
}


ITEM_ALIASES = {
    "aloo": "potato",
    "aalu": "potato",
    "potato": "potato",

    "tamatar": "tomato",
    "tomato": "tomato",

    "pyaz": "onion",
    "pyaaz": "onion",
    "onion": "onion",

    "kela": "banana",
    "banana": "banana",

    "seb": "apple",
    "apple": "apple",

    "chawal": "rice",
    "rice": "rice",

    "aam": "mango",
    "mango": "mango",

    # Hindi (Devanagari)
    "आलू": "potato",
    "आलु": "potato",
    "टमाटर": "tomato",
    "प्याज": "onion",
    "प्याज़": "onion",

    # Kannada
    "ಆಲೂಗಡ್ಡೆ": "potato",
    "ಟೊಮ್ಯಾಟೊ": "tomato",
    "ಟೊಮ್ಯಾಟೋ": "tomato",
    "ಈರುಳ್ಳಿ": "onion",

    # Tamil
    "உருளைக்கிழங்கு": "potato",
    "தக்காளி": "tomato",
    "வெங்காயம்": "onion",
}


def replace_number_words(text):

    words = text.split()

    converted = []

    for word in words:

        lower = word.lower()

        if lower in NUMBER_WORDS:

            converted.append(
                str(NUMBER_WORDS[lower])
            )

        else:

            converted.append(word)

    return " ".join(converted)


def normalize_item_names(text):

    words = text.split()

    normalized = []

    for word in words:

        lower = word.lower()

        if lower in ITEM_ALIASES:

            normalized.append(
                ITEM_ALIASES[lower]
            )

        else:

            normalized.append(word)

    return " ".join(normalized)


def normalize_text(text):

    text = text.lower()

    # Normalize common currency symbol to a token we can match.
    text = text.replace("₹", " rs ")

    text = replace_number_words(text)

    text = normalize_item_names(text)

    # Keep Unicode letters/digits/underscore/space; drop punctuation.
    # This allows native-script Hindi/Kannada/Tamil to survive normalization.
    text = re.sub(r"[^\w\s]", " ", text, flags=re.UNICODE)

    text = re.sub(r"\s+", " ", text).strip()

    return text