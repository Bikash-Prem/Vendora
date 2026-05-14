from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

Base = declarative_base()


class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    item = Column(String)

    quantity = Column(Integer)

    price = Column(Integer)

    total = Column(Integer)

    original_text = Column(String)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )


class InventoryItem(Base):

    __tablename__ = "inventory_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    item = Column(
        String,
        unique=True,
        index=True
    )

    stock = Column(
        Integer,
        default=0
    )

    unit = Column(
        String,
        default="kg"
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow
    )