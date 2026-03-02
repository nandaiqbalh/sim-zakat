// components/transactions/TransactionForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls, selectCls } from "@/components/zakat/ZakatFormField";
import { recordTransactionAction, updateTransactionAction } from "@/lib/actions/transaction.actions";

const ASSET_TYPES = [
  { value: "RICE", label: "🌾 Beras (Kilogram)" },
  { value: "CASH", label: "💵 Uang Tunai (Rupiah)" },
];

const INITIAL = { muzakkiName: "", assetType: "RICE", amount: "", note: "" };

export default function TransactionForm({ onSuccess, redirectTo, transaction = null, onCancel }) {
  const router = useRouter();
  const [form, setForm] = useState(transaction ? {
    muzakkiName: transaction.muzakki?.name || "",
    assetType: transaction.assetType,
    amount: transaction.amount,
    note: transaction.note || "",
  } : INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSuccess = () => {
    if (typeof onSuccess === "function") return onSuccess();
    if (redirectTo) return router.push(redirectTo);
    if (onCancel) return onCancel();
    router.refresh();
  }
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = { ...form, amount: parseFloat(form.amount) };
    const res = transaction
      ? await updateTransactionAction(transaction.id, payload)
      : await recordTransactionAction(payload);

    setLoading(false);

    if (res.success) {
      toast.success("Transaksi berhasil dicatat.");
      setForm(INITIAL);
      handleSuccess();
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <ZakatCard accent>
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <PlusCircle className="w-4 h-4 text-green-700" />
        {transaction ? "Edit Transaksi" : "Catat Transaksi Baru"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ZakatFormField label="Nama Muzakki (Pembayar)" required>
          <input
            type="text"
            className={inputCls}
            placeholder="Masukkan nama lengkap muzakki"
            value={form.muzakkiName}
            onChange={set("muzakkiName")}
            required
          />
          <p className="text-xs text-gray-400 mt-0.5">
            Muzakki baru akan otomatis dibuat jika belum ada.
          </p>
        </ZakatFormField>

        <div className="grid grid-cols-2 gap-3">
          <ZakatFormField label="Jenis" required>
            <select
              className={selectCls}
              value={form.assetType}
              onChange={set("assetType")}
            >
              {ASSET_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </ZakatFormField>

          <ZakatFormField
            label={form.assetType === "CASH" ? "Jumlah (Rp)" : "Jumlah (kg)"}
            required
          >
            <input
              type="number"
              min="0"
              step={form.assetType === "CASH" ? "1000" : "0.1"}
              className={inputCls}
              placeholder={form.assetType === "CASH" ? "50000" : "2.5"}
              value={form.amount}
              onChange={set("amount")}
              required
            />
          </ZakatFormField>
        </div>

        <ZakatFormField label="Catatan (opsional)">
          <input
            type="text"
            className={inputCls}
            placeholder="Contoh: Zakat fitrah untuk Bu Siti dan Sdr. Ahmad"
            value={form.note}
            onChange={set("note")}
          />
        </ZakatFormField>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        {transaction && onCancel && (
          <ZakatButton variant="secondary" onClick={onCancel} className="w-full justify-center">
            Batal
          </ZakatButton>
        )}

        <ZakatButton type="submit" loading={loading} className="w-full justify-center">
          Simpan Transaksi
        </ZakatButton>
      </form>
    </ZakatCard>
  );
}
