import re


def _extract_quantity(text: str) -> int:
    # Prefer explicit unit mentions; fallback to first number.
    unit_match = re.search(
        r"(\d+)\s*(kg|kilo|किलो|केजी|ಕೆಜಿ|ಕಿಲೋ|கிலோ)",
        text,
        flags=re.IGNORECASE,
    )

    if unit_match:
        return int(unit_match.group(1))

    first_number = re.search(r"(\d+)", text)
    return int(first_number.group(1)) if first_number else 0


def _extract_price(text: str) -> int:
    # Require explicit currency tokens to avoid accidentally picking quantity.
    # Supports both prefix (₹30 / rs 30 / ರೂ 30) and suffix (30rs / 30 rs / 30 रुपये).
    # Important edge case: "40 ₹30" should treat ₹ as prefix for 30 (not suffix for 40).
    currency_tokens = r"(?:₹|rs|rupees|rupaye|रुपये|रुपया|ರೂ|ರು|ரூ)"

    amounts_with_pos: list[tuple[int, int]] = []

    # Prefix: token before number (₹30, rs 30)
    for match in re.finditer(rf"({currency_tokens})\s*(\d+)", text, flags=re.IGNORECASE):
        try:
            amounts_with_pos.append((match.start(), int(match.group(2))))
        except ValueError:
            continue

    # Suffix: number before token (30rs, 30 rs). Reject cases like "40 ₹30" where
    # the currency token is immediately followed by digits (i.e., it's a prefix for the next number).
    for match in re.finditer(rf"(\d+)\s*({currency_tokens})", text, flags=re.IGNORECASE):
        end = match.end()
        if end < len(text) and text[end : end + 1].isdigit():
            continue
        try:
            amounts_with_pos.append((match.start(), int(match.group(1))))
        except ValueError:
            continue

    if not amounts_with_pos:
        return 0

    # Keep in textual order.
    amounts_with_pos.sort(key=lambda x: x[0])
    amounts = [a for _, a in amounts_with_pos]

    if len(amounts) == 1:
        return amounts[0]

    quantity = _extract_quantity(text)

    # If both a unit price and a total are mentioned (e.g., "2 items 30rs 60"),
    # pick the unit price that matches any other amount when multiplied by quantity.
    if quantity and quantity > 1:
        for i, amount in enumerate(amounts):
            for j, other in enumerate(amounts):
                if i == j:
                    continue
                if amount * quantity == other:
                    return amount

    # Fallback: price tends to appear later than quantity.
    return amounts[-1]


def extract_data(text: str):
    """Extract item/quantity/price/total from (already normalized) text."""

    words = text.split()
    item = None

    ignore_words = {
        # units
        "kg",
        "kilo",
        "किलो",
        "केजी",
        "ಕೆಜಿ",
        "ಕಿಲೋ",
        "கிலோ",
        # currency
        "rs",
        "rupees",
        "rupaye",
        "रुपये",
        "रुपया",
        "₹",
        "ರೂ",
        "ರು",
        "ரூ",
        # verbs/time markers
        "sold",
        "sell",
        "becha",
        "bechi",
        "बेचा",
        "बेची",
        "बेचे",
        "आज",
        "aaj",
        "today",
        "ಇಂದು",
        "இன்று",
    }

    for word in words:
        clean_word = word.lower()
        if clean_word.isdigit() or clean_word in ignore_words:
            continue
        item = clean_word
        break

    quantity = _extract_quantity(text)
    price = _extract_price(text)
    total = quantity * price

    return {"item": item, "quantity": quantity, "price": price, "total": total}
