import type { TransactionCardProps } from "../../types/dashboard";

export default function TransactionCard({
  product,
  quantity,
  price,
  total,
  time,
  emoji,
}: TransactionCardProps) {
  return (
    <div className="mt-10 bg-white rounded-3xl p-5 shadow-sm">

      <div className="flex justify-between items-center">

        <h3 className="text-green-600 font-semibold text-xl">
          Nayi Entry
        </h3>

        <p className="text-gray-400">
          {time}
        </p>

      </div>

      <div className="mt-6 flex items-center gap-4">

        <div className="
          w-24 h-24
          rounded-2xl
          bg-yellow-100
          flex items-center justify-center
          text-5xl
        ">
          {emoji}
        </div>

        <div>

          <h2 className="text-3xl font-semibold">
            {product}
          </h2>

          <p className="text-gray-500 text-lg mt-2">
            {quantity} • {price}
          </p>

        </div>

      </div>

      <div className="border-t mt-6 pt-4 flex justify-between items-center">

        <p className="text-gray-500 text-lg">
          Kul Rakam
        </p>

        <h1 className="text-5xl font-bold text-green-600">
          {total}
        </h1>

      </div>

    </div>
  );
}