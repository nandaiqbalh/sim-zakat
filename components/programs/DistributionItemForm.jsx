// components/programs/DistributionItemForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls, selectCls } from "@/components/zakat/ZakatFormField";
import { addDistributionItemAction } from "@/lib/actions/program.actions";

const ASSET_TYPES = [
  { value: "CASH", label: "💵 Uang (Rupiah)" },
  { value: "RICE", label: "🌾 Beras (Kilogram)" },
];

const BLANK = { mustahikId: "", assetType: "CASH", amount: "" };

export default function DistributionItemForm({ programId, mustahik }) {
  const router = useRouter();
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await addDistributionItemAction(programId, {
      ...form,
      amount: parseFloat(form.amount),
    });

    setLoading(false);

    if (res.success) {
      toast.success("Mustahik berhasil ditambahkan ke program.");
      setForm(BLANK);
      router.refresh();
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <ZakatCard accent className="mb-6">
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <UserPlus className="w-4 h-4 text-green-700" />
        Tambah Penerima
      </h3>

      {mustahik.length === 0 ? (
        <p className="text-sm text-gray-500 bg-amber-50 px-3 py-2 rounded-lg">
          Tidak ada mustahik aktif ditemukan. {" "}
          <a href="/admin/mustahik" className="text-green-700 font-medium hover:underline">
            Tambah mustahik terlebih dahulu →
          </a>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <ZakatFormField label="Penerima (Mustahik)" required>
            <select
              className={selectCls}
              value={form.mustahikId}
              onChange={set("mustahikId")}
              required
            >
              <option value="">— Pilih mustahik —</option>
              {mustahik.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.category})
                </option>
              ))}
            </select>
          </ZakatFormField>

          <div className="grid grid-cols-2 gap-3">
            <ZakatFormField label="Tipe Aset" required>
              <select className={selectCls} value={form.assetType} onChange={set("assetType")}> 
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
                placeholder={form.assetType === "CASH" ? "100000" : "2.5"}
                value={form.amount}
                onChange={set("amount")}
                required
              />
            </ZakatFormField>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <ZakatButton type="submit" loading={loading}>
            Tambahkan ke Program
          </ZakatButton>
        </form>
      )}
    </ZakatCard>
  );
}
