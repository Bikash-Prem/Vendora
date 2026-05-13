import { Menu, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between">

      <button className="p-2">
        <Menu size={28} strokeWidth={2.5} />
      </button>

      <div className="text-center">

        <h1 className="text-2xl font-bold tracking-tight">
          VoiceOps <span className="text-green-500">AI</span>
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Aapka AI Saathi
        </p>

      </div>

      <button className="p-2 text-green-500">
        <ShieldCheck size={28} strokeWidth={2.5} />
      </button>

    </div>
  );
}