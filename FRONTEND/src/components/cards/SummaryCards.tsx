import type { SummaryCardProps } from "../../types/dashboard";

export default function SummaryCard({
  title,
  amount,
  color,
  icon,
}: SummaryCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">

      <div
        className={`
          w-16 h-16 rounded-full
          flex items-center justify-center
          text-3xl
          ${color}
        `}
      >
        {icon}
      </div>

      <p className="mt-4 text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {amount}
      </h2>

    </div>
  );
}