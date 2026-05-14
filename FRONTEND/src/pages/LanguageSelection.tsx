import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "English",
    native: "English",
    emoji: "🇬🇧",
  },
  {
    name: "Hindi",
    native: "हिंदी",
    emoji: "🇮🇳",
  },
  {
    name: "Kannada",
    native: "ಕನ್ನಡ",
    emoji: "🇮🇳",
  },
  {
    name: "Tamil",
    native: "தமிழ்",
    emoji: "🇮🇳",
  },
];

export default function LanguageSelection() {
  const navigate = useNavigate();

  function selectLanguage(language: string) {
    localStorage.setItem("voiceops_language", language);
    navigate("/home");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10 sm:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            VoiceOps <span className="text-emerald-600">AI</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
            Voice-first business OS — choose your preferred language to get started.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-200 sm:mt-12 sm:p-4">
          <div className="grid gap-3 sm:gap-4">
            {languages.map((language) => (
              <button
                key={language.name}
                onClick={() => selectLanguage(language.name)}
                className="group w-full rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-200 transition hover:shadow-md hover:ring-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl" aria-hidden="true">
                      {language.emoji}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                        {language.name}
                      </h2>
                      <p className="mt-0.5 text-sm text-slate-600 sm:text-base">
                        {language.native}
                      </p>
                    </div>
                  </div>

                  <div className="text-2xl text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-600" aria-hidden="true">
                    →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Tip: you can change this later from the Home screen.
        </p>
      </div>
    </div>
  );
}