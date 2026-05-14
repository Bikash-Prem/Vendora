import { useEffect, useState } from "react";
import api from "../services/api";
import { createTranslator } from "../i18n/strings";

interface Transaction {
  id: number;
  item: string;
  quantity: number;
  price: number;
  total: number;
  original_text: string;
  timestamp?: string | null;
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
  const selectedLanguage = localStorage.getItem("voiceops_language") || "English";
  const t = createTranslator(selectedLanguage);
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [error, setError] = useState("");

  const [inputText, setInputText] = useState("");

  function formatTimestamp(value?: string | null) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
    let cancelled = false;

    api
      .get("/dashboard")
      .then((response) => {
        if (cancelled) return;
        setDashboardData(response.data);
      })
      .catch((fetchError) => {
        if (cancelled) return;
        console.error(fetchError);
        setError("Backend Error");
      });

    return () => {
      cancelled = true;
    };
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
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h1 className="text-2xl font-semibold text-slate-900">{t("dashboard")}</h1>
            <p className="mt-2 text-base font-medium text-rose-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-lg font-semibold text-slate-900">{t("loading")}</p>
            <p className="mt-2 text-sm text-slate-600">Fetching your latest sales and entries.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {t("dashboard")}
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              {t("summarySubtitle")}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-5">
            <h2 className="text-lg font-semibold text-slate-900">{t("quickAdd")}</h2>
            <p className="mt-1 text-sm text-slate-600">{t("quickAddHint")}</p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder={t("typeShortEntry")}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="h-12 flex-1 rounded-2xl bg-slate-50 px-4 text-base text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />

              <button
                onClick={addTransaction}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-base font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {t("add")}
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-600">{t("totalSales")}</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-700 sm:text-4xl">
                ₹{dashboardData.summary.total_sales}
              </p>
              <p className="mt-1 text-sm text-slate-500">All-time (from saved entries)</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-600">{t("transactions")}</p>
              <p className="mt-3 text-3xl font-semibold text-sky-700 sm:text-4xl">
                {dashboardData.summary.total_transactions}
              </p>
              <p className="mt-1 text-sm text-slate-500">Count of entries</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:col-span-2">
              <p className="text-sm font-medium text-slate-600">{t("topSellingItem")}</p>
              <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-2xl font-semibold capitalize text-slate-900">
                  {dashboardData.top_item.name ?? "—"}
                </p>
                <p className="text-sm text-slate-600">
                  {t("qtySold")}: <span className="font-semibold text-slate-900">{dashboardData.top_item.total_quantity}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{t("recentTransactions")}</h2>
              <p className="mt-1 text-sm text-slate-600">{t("latestEntriesHint")}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {dashboardData.transactions.map((transaction) => (
              <div key={transaction.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold capitalize text-slate-900">{transaction.item}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Qty <span className="font-semibold text-slate-900">{transaction.quantity}</span> • Price ₹{transaction.price}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-semibold text-emerald-700">₹{transaction.total}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatTimestamp(transaction.timestamp)}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="text-sm text-slate-600" style={{ wordBreak: "break-word" }}>
                    {transaction.original_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}