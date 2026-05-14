import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import api from "../services/api";
import { createTranslator } from "../i18n/strings";

declare global {
  interface Window {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  }
}

type SpeechRecognitionResultLike = {
  0: {
    transcript: string;
  };
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: null | (() => void);
  onresult: null | ((event: SpeechRecognitionEventLike) => void);
  onerror: null | ((event: SpeechRecognitionErrorEventLike) => void);
  onend: null | (() => void);
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtorLike = new () => SpeechRecognitionLike;

export default function Home() {
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem("voiceops_language") || "English";
  const t = createTranslator(selectedLanguage);
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("");
  const [draftText, setDraftText] = useState<string>("");
  const [typedText, setTypedText] = useState<string>("");
  const [lastResult, setLastResult] = useState<{
    normalized_text?: string;
    intent?: string;
    fraud_check?: string;
    predicted_demand?: string;
  } | null>(null);
  const finalTranscriptRef = useRef("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const recognitionLang = (() => {
    switch (selectedLanguage) {
      case "Hindi":
        return "hi-IN";
      case "Kannada":
        return "kn-IN";
      case "Tamil":
        return "ta-IN";
      default:
        return "en-IN";
    }
  })();

  async function saveVoiceTransaction(text: string) {
    try {
      setStatus(t("savingEntry"));
      const response = await api.post("/add-transaction", { text });
      setLastResult({
        normalized_text: response.data?.normalized_text,
        intent: response.data?.intent,
        fraud_check: response.data?.fraud_check,
        predicted_demand: response.data?.predicted_demand,
      });
      setStatus(t("savedSuccess"));
    } catch (error) {
      console.error(error);
      setStatus(t("failedToSave"));
    }
  }

  function startListening() {
    const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition) as
      | SpeechRecognitionCtorLike
      | undefined;

    if (!SpeechRecognition) {
      setStatus(t("speechNotSupported"));
      return;
    }

    if (listening && recognitionRef.current) {
      setStatus(t("stopping"));
      recognitionRef.current.stop();
      return;
    }

    finalTranscriptRef.current = "";
    setStatus("");
    setDraftText("");
    setLastResult(null);
    setTypedText("");

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = recognitionLang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      setStatus(t("listeningTapToStop"));
    };

    recognition.onresult = (event) => {
      let accumulated = "";
      for (let i = 0; i < event.results.length; ++i) {
        accumulated += event.results[i][0].transcript;
      }
      finalTranscriptRef.current = accumulated;
    };

    recognition.onerror = (event) => {
      console.error(event);
      setListening(false);
      setStatus(t("voiceFailed", { error: event.error ?? "unknown" }));
    };

    recognition.onend = async () => {
      setListening(false);
      recognitionRef.current = null;
      if (!finalTranscriptRef.current.trim()) {
        setStatus(t("noSpeechDetected"));
        return;
      }
      setDraftText(finalTranscriptRef.current.trim());
      setStatus(t("reviewAndSave"));
    };

    recognition.start();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              VoiceOps <span className="text-emerald-600">AI</span>
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              {t("tagline")}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              <span className="text-slate-500">{t("language")}</span>
              <span className="text-slate-900">{selectedLanguage}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{recognitionLang}</span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="text-left text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              {t("changeLanguage")}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              {t("speakYourEntry")}
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              {t("exampleSpeech")}
            </p>

            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={startListening}
                className={
                  "group relative flex items-center justify-center rounded-full shadow-xl ring-1 ring-slate-200 transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 " +
                  (listening
                    ? "bg-rose-600"
                    : "bg-gradient-to-br from-sky-600 to-emerald-500")
                }
                style={{ width: 260, height: 260 }}
                aria-pressed={listening}
              >
                <span
                  className={
                    "absolute -inset-4 rounded-full blur-2xl transition " +
                    (listening ? "bg-rose-500/25" : "bg-emerald-500/20")
                  }
                  aria-hidden="true"
                />
                <Mic size={110} color="white" />
              </button>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold text-slate-900">
                  {listening ? t("listeningTapToStop") : t("tapToSpeak")}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {t("keepItSimple")}
                </p>
              </div>
            </div>

            {status && (
              <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-slate-200" aria-live="polite">
                {status}
              </div>
            )}

            <div className="mt-8 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-900">{t("typeInstead")}</p>
              <p className="mt-1 text-sm text-slate-600">{t("typeYourEntry")}</p>

              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder={t("typePlaceholder")}
                className="mt-3 min-h-24 w-full resize-none rounded-2xl bg-white px-4 py-3 text-base text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={async () => {
                    const text = typedText.trim();
                    if (!text) return;
                    setDraftText(text);
                    setStatus(t("reviewAndSave"));
                    setTypedText("");
                  }}
                  disabled={!typedText.trim()}
                  className={
                    "inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 " +
                    (typedText.trim()
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-slate-200 text-slate-500")
                  }
                >
                  {t("saveTypedEntry")}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  {t("aiUnderstood")}
                </h2>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  {t("reviewBeforeSaving")}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">{t("editEntry")}</p>
              </div>

              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder={draftText ? undefined : t("editPlaceholder")}
                className={
                  "mt-3 min-h-28 w-full resize-none rounded-2xl bg-white px-4 py-3 text-base ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 " +
                  (draftText ? "text-slate-900" : "text-slate-500")
                }
              />

              {!draftText && (
                <p className="mt-3 text-sm text-slate-600">{t("transcriptEmpty")}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={async () => {
                  const text = draftText.trim();
                  if (!text) return;
                  await saveVoiceTransaction(text);
                  setDraftText("");
                }}
                disabled={!draftText.trim()}
                className={
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 " +
                  (draftText.trim()
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-500")
                }
              >
                {t("saveEntry")}
              </button>

              <button
                onClick={() => {
                  finalTranscriptRef.current = "";
                  setDraftText("");
                  setStatus("");
                  setLastResult(null);
                  setTypedText("");
                }}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-base font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {t("clear")}
              </button>
            </div>

            {lastResult && (
              <div className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">{t("aiInsights")}</h3>
                <div className="mt-3 grid gap-3 text-sm text-slate-700">
                  {lastResult.normalized_text && (
                    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <p className="text-xs font-semibold text-slate-500">{t("normalized")}</p>
                      <p className="mt-1" style={{ wordBreak: "break-word" }}>
                        {lastResult.normalized_text}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <p className="text-xs font-semibold text-slate-500">{t("intent")}</p>
                      <p className="mt-1 font-semibold text-slate-900">{lastResult.intent ?? "—"}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <p className="text-xs font-semibold text-slate-500">{t("fraudCheck")}</p>
                      <p className="mt-1 font-semibold text-slate-900">{lastResult.fraud_check ?? "—"}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <p className="text-xs font-semibold text-slate-500">{t("demand")}</p>
                      <p className="mt-1 font-semibold text-slate-900">{lastResult.predicted_demand ?? "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-3xl bg-slate-50 p-5 text-left ring-1 ring-slate-200 transition hover:bg-white hover:shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{t("dashboard")}</h3>
                <p className="mt-1 text-sm text-slate-600">{t("analyticsInsights")}</p>
              </button>

              <button
                onClick={() => navigate("/history")}
                className="rounded-3xl bg-slate-50 p-5 text-left ring-1 ring-slate-200 transition hover:bg-white hover:shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{t("history")}</h3>
                <p className="mt-1 text-sm text-slate-600">{t("allVoiceEntries")}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}