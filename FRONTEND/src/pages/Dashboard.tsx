import { useEffect, useState } from "react";
import api from "../services/api";

interface Transaction {
  id: number;
  item: string;
  quantity: number;
  price: number;
  total: number;
  original_text: string;
}

interface DashboardData {
  summary: {
    total_sales: number;
    total_transactions: number;
  };

  top_item: {
    name: string;
    total_quantity: number;
  };

  transactions: Transaction[];
}

export default function Dashboard() {

  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [error, setError] = useState("");

  const [inputText, setInputText] = useState("");

  async function fetchDashboard() {

    try {

      const response = await api.get("/dashboard");

      setDashboardData(response.data);

    } catch (error) {

      console.error(error);

      setError("Backend Error");
    }
  }

  useEffect(() => {

    fetchDashboard();

  }, []);

  async function addTransaction() {

    if (!inputText.trim()) return;

    try {

      await api.post("/add-transaction", {
        text: inputText,
      });

      setInputText("");

      await fetchDashboard();

    } catch (error) {

      console.error(error);

      alert("Failed to add transaction");
    }
  }

  if (error) {
    return (
      <div className="p-10 text-red-500 text-3xl">
        {error}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-10 text-3xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">

      <h1 className="text-4xl font-bold mb-8">
        VoiceOps AI Dashboard
      </h1>

      {/* INPUT SECTION */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Add Transaction
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Example: 25 apple 10 rs"
            value={inputText}
            onChange={(e) =>
              setInputText(e.target.value)
            }
            className="
              flex-1
              p-4
              rounded-2xl
              border
              border-gray-200
              outline-none
              text-lg
            "
          />

          <button
            onClick={addTransaction}
            className="
              bg-green-500
              hover:bg-green-600
              text-white
              px-6
              rounded-2xl
              font-semibold
              transition
            "
          >
            Add
          </button>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">
            Total Sales
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            ₹{dashboardData.summary.total_sales}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <p className="text-gray-500">
            Transactions
          </p>

          <h2 className="text-4xl font-bold text-blue-500 mt-3">
            {dashboardData.summary.total_transactions}
          </h2>

        </div>

      </div>

      {/* TOP ITEM */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-6">

        <p className="text-gray-500">
          Top Selling Item
        </p>

        <h2 className="text-3xl font-bold mt-3 capitalize">
          {dashboardData.top_item.name}
        </h2>

        <p className="text-lg text-gray-600 mt-2">
          Quantity Sold:
          {" "}
          {dashboardData.top_item.total_quantity}
        </p>

      </div>

      {/* TRANSACTIONS */}
      <div className="mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Recent Transactions
        </h2>

        <div className="space-y-4">

          {dashboardData.transactions.map((transaction) => (

            <div
              key={transaction.id}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >

              <div className="flex justify-between">

                <h3 className="text-2xl font-semibold capitalize">
                  {transaction.item}
                </h3>

                <h3 className="text-2xl font-bold text-green-600">
                  ₹{transaction.total}
                </h3>

              </div>

              <p className="text-gray-500 mt-2">
                Qty:
                {" "}
                {transaction.quantity}
                {" "}
                • Price:
                {" "}
                ₹{transaction.price}
              </p>

              <p className="text-gray-400 mt-2 text-sm">
                {transaction.original_text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}