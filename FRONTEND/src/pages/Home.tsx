import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import api from "../services/api";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem("voiceops_language") || "English";
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("");
  const finalTranscriptRef = useRef("");

  async function saveVoiceTransaction(text: string) {
    try {
      setStatus("Processing transaction...");
      await api.post("/add-transaction", { text });
      setStatus("Transaction saved successfully");
    } catch (error) {
      console.error(error);
      setStatus("Failed to save transaction");
    }
  }

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    finalTranscriptRef.current = "";
    setTranscript("");
    setStatus("");

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      setStatus("Listening...");
    };

    recognition.onresult = (event: any) => {
      let accumulated = "";
      for (let i = 0; i < event.results.length; ++i) {
        accumulated += event.results[i][0].transcript;
      }
      finalTranscriptRef.current = accumulated;
      setTranscript(accumulated);
      setStatus("Processing speech...");
    };

    recognition.onerror = (event: any) => {
      console.error(event);
      setListening(false);
      setStatus(`Voice recognition failed: ${event.error}`);
    };

    recognition.onend = async () => {
      setListening(false);
      if (!finalTranscriptRef.current.trim()) {
        setStatus("No speech detected");
        return;
      }
      setStatus("Saving transaction...");
      await saveVoiceTransaction(finalTranscriptRef.current);
    };

    recognition.start();
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md">
        <p className="text-gray-500 text-lg">Selected Language</p>
        <h2 className="text-3xl font-bold mt-1">{selectedLanguage}</h2>
      </div>

      <div className="mt-16 text-center">
        <h1 className="text-5xl font-bold leading-tight">VoiceOps AI</h1>
        <p className="text-gray-500 text-xl mt-4 max-w-md">
          Your voice-first business operating system
        </p>
      </div>

      <button
        onClick={startListening}
        className={`
          mt-16 w-72 h-72 rounded-full shadow-2xl
          flex items-center justify-center
          active:scale-95 transition-all
          ${listening ? "bg-red-500 animate-pulse" : "bg-gradient-to-br from-blue-500 to-green-400"}
        `}
      >
        <Mic size={120} color="white" />
      </button>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">
          {listening ? "Listening..." : "Tap To Speak"}
        </h2>
        <p className="text-gray-500 text-lg mt-3">
          Example: 40 kilo potato 30 rupees
        </p>
      </div>

      {transcript && (
        <div className="mt-10 bg-white rounded-3xl p-5 shadow-sm w-full max-w-md">
          <h2 className="text-xl font-semibold">AI Understood</h2>
          <p className="mt-3 text-lg text-gray-700">{transcript}</p>
        </div>
      )}

      {status && (
        <div className="mt-6 text-lg font-medium text-green-600">{status}</div>
      )}

      <div className="mt-16 w-full max-w-md grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white rounded-3xl p-5 shadow-sm text-left"
        >
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-gray-500 mt-2">View analytics</p>
        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-white rounded-3xl p-5 shadow-sm text-left"
        >
          <h2 className="text-2xl font-semibold">History</h2>
          <p className="text-gray-500 mt-2">Transaction logs</p>
        </button>
      </div>
    </div>
  );
}