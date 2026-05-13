def validate_transaction(data):

    if data["quantity"] < 0:
        data["quantity"] = 0

    if data["price"] < 0:
        data["price"] = 0

    return data