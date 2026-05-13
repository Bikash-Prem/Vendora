from services.normalize import normalize_text
from services.validate import validate_transaction


def process_transaction(text, extract_function):

    normalized_text = normalize_text(text)

    extracted_data = extract_function(
        normalized_text
    )

    validated_data = validate_transaction(
        extracted_data
    )

    return {
        "normalized_text": normalized_text,
        "transaction": validated_data
    }