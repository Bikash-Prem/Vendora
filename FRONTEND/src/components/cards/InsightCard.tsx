import type { InsightCardProps } from "../../types/dashboard";

export default function InsightCard({
  message,
}: InsightCardProps) {
  return (
    <div className="
      bg-white
      rounded-3xl
      p-5
      shadow-sm
      mt-6
    ">
      <p className="text-gray-700 text-lg">
        {message}
      </p>
    </div>
  );
}