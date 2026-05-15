import whisper
import os
import shutil
import tempfile
from pathlib import Path

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

    temp_file_path: str | None = None

    # Accept either a filesystem path OR a FastAPI UploadFile-like object.
    if isinstance(audio_path, (str, os.PathLike, Path)):
        path_to_transcribe = str(audio_path)
    else:
        filename = getattr(audio_path, "filename", None) or "audio"
        suffix = Path(filename).suffix or ".wav"

        # On Windows, NamedTemporaryFile must be closed before other libs open it.
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        temp_file_path = tmp.name
        tmp.close()

        file_obj = getattr(audio_path, "file", None)
        if file_obj is None:
            raise TypeError("transcribe_audio expected a path or UploadFile-like object")

        try:
            file_obj.seek(0)
        except Exception:
            pass

        with open(temp_file_path, "wb") as out_f:
            shutil.copyfileobj(file_obj, out_f)

        path_to_transcribe = temp_file_path

    try:
        result = model.transcribe(path_to_transcribe)
        return result["text"]
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.remove(temp_file_path)
            except Exception:
                pass