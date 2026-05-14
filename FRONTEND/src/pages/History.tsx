import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function History() {
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem("voiceops_language") || "English";
  const t = createTranslator(selectedLanguage);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const totalSales = useMemo(
    () => transactions.reduce((acc, t) => acc + (Number(t.total) || 0), 0),
    [transactions],
  );

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

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError("");
      const response = await api.get<Transaction[]>("/transactions");
      setTransactions(response.data ?? []);
    } catch (e) {
      console.error(e);
      setError(t("failedToLoadHistory"));
    } finally {
      setLoading(false);
    }
  }

  async function deleteTransaction(id: number) {
    try {
      setDeletingId(id);
      await api.delete(`/delete-transaction/${id}`);
      await fetchTransactions();
    } catch (e) {
      console.error(e);
      alert(t("failedToDelete"));
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    let cancelled = false;

    api
      .get<Transaction[]>("/transactions")
      .then((response) => {
        if (cancelled) return;
        setTransactions(response.data ?? []);
      })
      .catch((fetchError) => {
        if (cancelled) return;
        console.error(fetchError);
        setError("Failed to load history (backend error)");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {t("history")}
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              All saved entries from voice and quick add.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <button
              onClick={() => navigate("/home")}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {t("backToHome")}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {t("dashboard")}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-600">{t("entries")}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{transactions.length}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:col-span-2">
            <p className="text-sm font-medium text-slate-600">{t("totalSalesHistory")}</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-700">₹{totalSales}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">{t("transactions")}</h2>
            <button
              onClick={fetchTransactions}
              className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-50 px-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {t("refresh")}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm font-medium text-rose-700 ring-1 ring-rose-200">
              {error}
            </div>
          )}

          {loading ? (
            <p className="mt-6 text-sm text-slate-600">{t("loading")}</p>
          ) : transactions.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 ring-1 ring-slate-200">
              {t("noTransactionsYet")}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {transactions
                .slice()
                .reverse()
                .map((tx) => (
                  <div key={tx.id} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold capitalize text-slate-900">{tx.item}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          Qty <span className="font-semibold text-slate-900">{tx.quantity}</span> • Price ₹{tx.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-emerald-700">₹{tx.total}</p>
                        <p className="mt-1 text-xs text-slate-500">{formatTimestamp(tx.timestamp)}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                      <p className="text-sm text-slate-600" style={{ wordBreak: "break-word" }}>
                        {tx.original_text}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        disabled={deletingId === tx.id}
                        className={
                          "inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 " +
                          (deletingId === tx.id
                            ? "bg-slate-200 text-slate-500 ring-slate-200"
                            : "bg-white text-rose-700 ring-rose-200 hover:bg-rose-50")
                        }
                      >
                        {deletingId === tx.id ? t("deleting") : t("delete")}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}