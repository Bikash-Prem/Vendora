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
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center px-6">

      <h1 className="text-5xl font-bold text-center">
        VoiceOps AI
      </h1>

      <p className="text-gray-500 text-xl mt-4 text-center max-w-md">
        Choose your preferred language
      </p>

      <div className="mt-12 w-full max-w-md space-y-4">

        {languages.map((language) => (

          <button
            key={language.name}
            onClick={() => selectLanguage(language.name)}
            className="
              w-full
              bg-white
              rounded-3xl
              p-5
              flex
              items-center
              justify-between
              shadow-sm
              hover:shadow-md
              transition-all
            "
          >
            <div className="flex items-center gap-4">

              <div className="text-4xl">
                {language.emoji}
              </div>

              <div className="text-left">

                <h2 className="text-2xl font-semibold">
                  {language.name}
                </h2>

                <p className="text-gray-500">
                  {language.native}
                </p>

              </div>
            </div>

            <div className="text-2xl">
              →
            </div>

          </button>

        ))}

      </div>

    </div>
  );
}