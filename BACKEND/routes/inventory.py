from fastapi import APIRouter
from pydantic import BaseModel

from database import SessionLocal
from models import InventoryItem

router = APIRouter()


class InventorySetRequest(BaseModel):
    item: str
    stock: int
    unit: str | None = None


class InventoryAdjustRequest(BaseModel):
    item: str
    delta: int


@router.get("/inventory")
def list_inventory():

    db = SessionLocal()

    items = (
        db.query(InventoryItem)
        .order_by(InventoryItem.item.asc())
        .all()
    )

    result = [
        {
            "id": i.id,
            "item": i.item,
            "stock": i.stock,
            "unit": i.unit,
            "updated_at": i.updated_at.isoformat() if i.updated_at else None,
        }
        for i in items
    ]

    db.close()

    return result


@router.post("/inventory/set")
def set_inventory(data: InventorySetRequest):

    db = SessionLocal()

    item_key = (data.item or "").strip().lower()

    existing = db.query(InventoryItem).filter(InventoryItem.item == item_key).first()

    if existing:
        existing.stock = max(0, int(data.stock))
        if data.unit:
            existing.unit = data.unit
    else:
        existing = InventoryItem(
            item=item_key,
            stock=max(0, int(data.stock)),
            unit=data.unit or "kg",
        )
        db.add(existing)

    db.commit()
    db.refresh(existing)

    db.close()

    return {
        "success": True,
        "item": {
            "id": existing.id,
            "item": existing.item,
            "stock": existing.stock,
            "unit": existing.unit,
        },
    }


@router.post("/inventory/adjust")
def adjust_inventory(data: InventoryAdjustRequest):

    db = SessionLocal()

    item_key = (data.item or "").strip().lower()

    existing = db.query(InventoryItem).filter(InventoryItem.item == item_key).first()

    if not existing:
        existing = InventoryItem(item=item_key, stock=0, unit="kg")
        db.add(existing)
        db.commit()
        db.refresh(existing)

    existing.stock = max(0, int(existing.stock) + int(data.delta))

    db.commit()
    db.refresh(existing)

    db.close()

    return {
        "success": True,
        "item": {
            "id": existing.id,
            "item": existing.item,
            "stock": existing.stock,
            "unit": existing.unit,
        },
    }
