
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base


from services.whisper_asr import transcribe_audio as transcribe_audio_whisper
from routes.transactions import router as transaction_router
from services.smart_pipeline import process_transaction
from services.ai_engine import classify_intent, normalize_product, fraud_check, predict_demand

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(transaction_router)



@app.get("/")
def home():
    return {"message": "VoiceOps AI Backend Running"}


# --- VOICE ENDPOINT ---
@app.post("/voice")
async def voice_input(audio: UploadFile = File(...)):
    """
    Accepts an audio file, transcribes it, runs NLP pipeline, and returns structured result.
    """
    transcript = transcribe_audio_whisper(audio)
    pipeline_result = process_transaction(transcript, None)
    intent = classify_intent(transcript)
    extracted = pipeline_result["transaction"]
    normalized_product = normalize_product(extracted["item"])
    fraud_status = fraud_check(extracted["quantity"])
    predicted_demand = predict_demand(normalized_product)
    return {
        "transcript": transcript,
        "intent": intent,
        "normalized_product": normalized_product,
        "fraud_check": fraud_status,
        "predicted_demand": predicted_demand,
        "transaction": extracted,
        "response": f"Intent: {intent}, Product: {normalized_product}, Qty: {extracted['quantity']}, Price: {extracted['price']}, Total: {extracted['total']}"
    }