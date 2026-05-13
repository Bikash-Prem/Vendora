import { Mic } from "lucide-react";

export default function MicSection() {
  return (
    <div className="mt-10 flex flex-col items-center">

      {/* OUTER GLOW */}
      <div className="
        w-72 h-72
        rounded-full
        bg-blue-100/70
        flex items-center justify-center
      ">

        {/* INNER BUTTON */}
        <button
          className="
            w-56 h-56
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-green-400
            shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            flex items-center justify-center
            active:scale-95
            transition-all
            duration-200
          "
        >
          <Mic size={80} color="white" strokeWidth={2.5} />
        </button>

      </div>

      <h2 className="
        mt-8
        text-2xl
        font-semibold
        text-center
        leading-snug
        max-w-xs
      ">
        Bolkar apna vyapar update karein
      </h2>

      <p className="text-gray-500 mt-3 text-base">
        Tap mic to speak
      </p>

    </div>
  );
}