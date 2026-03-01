// components/conversions/ConversionForm.jsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, RefreshCcw } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls } from "@/components/zakat/ZakatFormField";
import { convertAssetAction } from "@/lib/actions/conversion.actions";

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

export default function ConversionForm({ cashBalance }) {
  const router = useRouter();
  const [rate, setRate]           = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const toAmount = useMemo(() => {
    const r = parseFloat(rate);
    const a = parseFloat(fromAmount);
    if (!r || !a || r <= 0 || a <= 0) return null;
    return parseFloat((a / r).toFixed(3));
  }, [rate, fromAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await convertAssetAction({
      rate: parseFloat(rate),
      fromAmount: parseFloat(fromAmount),
    });

    setLoading(false);

    if (res.success) {
      toast.success(`Terkonversi ${fmt(res.data.fromAmount)} → ${res.data.toAmount} kg beras.`);
      setRate("");
      setFromAmount("");
      router.refresh();
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <ZakatCard accent className="mb-6">
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-1">
        <RefreshCcw className="w-4 h-4 text-green-700" />
        Konversi Uang → Beras
      </h3>
      <p className="text-xs text-gray-400 mb-5">
        Saldo uang tersedia: <strong className="text-green-700">{fmt(cashBalance)}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <ZakatFormField label="Harga Beras (Rp/kg)" required>
            <input
              type="number"
              min="1"
              step="any"
              className={inputCls}
              placeholder="misal 12500"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
          </ZakatFormField>

          <ZakatFormField label="Uang untuk Dikonversi (Rp)" required>
            <input
              type="number"
              min="1"
              step="any"
              className={inputCls}
              placeholder="misal 500000"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              required
            />
          </ZakatFormField>
        </div>

        {toAmount !== null && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
            <span className="text-gray-600">{fmt(fromAmount)}</span>
            <ArrowRight className="w-4 h-4 text-green-600 shrink-0" />
            <span className="font-bold text-green-800">{toAmount} kg beras</span>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}

        <ZakatButton type="submit" loading={loading} disabled={toAmount === null}>
          Konfirmasi Konversi
        </ZakatButton>
      </form>
    </ZakatCard>
  );
}
