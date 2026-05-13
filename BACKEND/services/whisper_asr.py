import whisper
import os

BASE_DIR = os.path.dirname(
    os.path.dirname(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "base.pt"
)

model = whisper.load_model(
    MODEL_PATH
)


def transcribe_audio(audio_path):

    result = model.transcribe(
        audio_path
    )

    return result["text"]