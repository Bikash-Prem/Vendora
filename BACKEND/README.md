# VoiceOps AI Backend

AI-powered backend system for informal business transaction management.

## Features

- Voice/text transaction processing
- Smart transaction extraction
- Hindi-English parsing support
- Sales analytics
- Top-selling item detection
- Daily sales summary
- SQLite database integration
- FastAPI backend
- REST APIs
- AI pipeline architecture

## Tech Stack

- FastAPI
- Python
- SQLite
- SQLAlchemy
- Uvicorn

## APIs

### POST /add-transaction

Add transaction from text input.

Example:
{
  "text": "25 apple 10 rs"
}

### GET /transactions

Fetch all saved transactions.

### GET /summary

Get total sales and transaction count.

### GET /top-item

Get most sold item.

### GET /daily-summary

Get daily sales summary.

### DELETE /delete-transaction/{id}

Delete transaction.

### GET /health

Backend health check.

## Architecture

Voice Input
↓
Normalization
↓
Transaction Extraction
↓
Validation
↓
Database Storage
↓
Analytics Engine

## Status

Hackathon MVP - Deployable