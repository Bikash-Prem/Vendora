from services.ai_engine import (
    classify_intent,
    normalize_product,
    fraud_check,
    predict_demand
)
from fastapi import APIRouter
from pydantic import BaseModel
import re

from database import SessionLocal
from models import Transaction, InventoryItem
from services.smart_pipeline import process_transaction
from services.extract import extract_data

router = APIRouter()


def get_dashboard_data():

    db = SessionLocal()

    transactions = (
        db.query(Transaction)
        .order_by(Transaction.timestamp.desc())
        .all()
    )

    total_sales = sum(t.total for t in transactions)
    total_transactions = len(transactions)

    item_totals = {}
    for t in transactions:
        if not t.item:
            continue
        item_totals[t.item] = item_totals.get(t.item, 0) + (t.quantity or 0)

    top_item_name = None
    top_item_qty = 0
    if item_totals:
        top_item_name = max(item_totals, key=item_totals.get)
        top_item_qty = item_totals[top_item_name]

    db.close()

    return {
        "summary": {
            "total_sales": total_sales,
            "total_transactions": total_transactions,
        },
        "top_item": {
            "name": top_item_name,
            "total_quantity": top_item_qty,
        },
        "transactions": [
            {
                "id": t.id,
                "item": t.item,
                "quantity": t.quantity,
                "price": t.price,
                "total": t.total,
                "original_text": t.original_text,
                "timestamp": t.timestamp.isoformat() if t.timestamp else None,
            }
            for t in transactions
        ],
    }


class TransactionRequest(BaseModel):
    text: str


@router.post("/add-transaction")
def add_transaction(data: TransactionRequest):

    db = SessionLocal()

    pipeline_result = process_transaction(
        data.text,
        extract_data
    )

    extracted = pipeline_result["transaction"]
    intent = classify_intent(data.text)

    normalized_product = normalize_product(
        extracted["item"]
    )

    fraud_status = fraud_check(
        extracted["quantity"]
    )

    predicted_demand = predict_demand(
        normalized_product
    )

    extracted["item"] = normalized_product
    new_transaction = Transaction(
        item=extracted["item"],
        quantity=extracted["quantity"],
        price=extracted["price"],
        total=extracted["total"],
        original_text=data.text
    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    # Inventory: decrement stock on SALES entries.
    try:
        if intent == "SALES" and extracted.get("item") and extracted.get("quantity"):
            item_key = str(extracted["item"]).strip().lower()

            inv = db.query(InventoryItem).filter(InventoryItem.item == item_key).first()
            if not inv:
                inv = InventoryItem(item=item_key, stock=0, unit="kg")
                db.add(inv)
                db.commit()
                db.refresh(inv)

            inv.stock = max(0, int(inv.stock or 0) - int(extracted["quantity"]))
            db.commit()
    except Exception:
        # Avoid breaking transaction logging due to inventory edge cases.
        pass

    db.close()

    return {
        "success": True,
        "message": "Transaction saved successfully",
        "normalized_text": pipeline_result["normalized_text"],
        "intent": intent,
        "fraud_check": fraud_status,
        "predicted_demand": predicted_demand,
        "transaction": {
            "id": new_transaction.id,
            "item": new_transaction.item,
            "quantity": new_transaction.quantity,
            "price": new_transaction.price,
            "total": new_transaction.total,
            "timestamp": new_transaction.timestamp
        }
    }


@router.get("/transactions")
def get_transactions():

    db = SessionLocal()

    transactions = db.query(Transaction).all()

    result = []

    for transaction in transactions:

        result.append({
            "id": transaction.id,
            "item": transaction.item,
            "quantity": transaction.quantity,
            "price": transaction.price,
            "total": transaction.total,
            "original_text": transaction.original_text,
            "timestamp": transaction.timestamp
        })

    db.close()

    return result


@router.get("/summary")
def get_summary():

    db = SessionLocal()

    transactions = db.query(Transaction).all()

    total_sales = sum(
        transaction.total for transaction in transactions
    )

    db.close()

    return {
        "total_sales": total_sales,
        "total_transactions": len(transactions)
    }


@router.get("/top-item")
def top_item():

    db = SessionLocal()

    transactions = db.query(Transaction).all()

    item_totals = {}

    for transaction in transactions:

        item = transaction.item

        if item not in item_totals:

            item_totals[item] = 0

        item_totals[item] += transaction.quantity

    db.close()

    if not item_totals:

        return {
            "top_item": None,
            "total_quantity": 0
        }

    top_item_name = max(
        item_totals,
        key=item_totals.get
    )

    return {
        "top_item": top_item_name,
        "total_quantity": item_totals[top_item_name]
    }


@router.delete("/delete-transaction/{transaction_id}")
def delete_transaction(transaction_id: int):

    db = SessionLocal()

    transaction = db.query(Transaction).filter(
        Transaction.id == transaction_id
    ).first()

    if not transaction:

        db.close()

        return {
            "message": "Transaction not found"
        }

    db.delete(transaction)

    db.commit()

    db.close()

    return {
        "message": "Transaction deleted"
    }


@router.get("/daily-summary")
def daily_summary():

    db = SessionLocal()

    transactions = db.query(Transaction).all()

    total_sales = sum(
        transaction.total for transaction in transactions
    )

    db.close()

    return {
        "today_sales": total_sales
    }


@router.get("/health")
def health():

    return {
        "status": "ok"
    }

@router.get("/dashboard")
def dashboard():

    data = get_dashboard_data()

    return data