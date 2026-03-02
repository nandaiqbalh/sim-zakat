// components/programs/DistributionItemForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus, AlertTriangle } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls, selectCls } from "@/components/zakat/ZakatFormField";
import { addDistributionItemAction } from "@/lib/actions/program.actions";

const ASSET_TYPES = [
  { value: "CASH", label: "💵 Uang (Rupiah)" },
  { value: "RICE", label: "🌾 Beras (Kilogram)" },
];

const BLANK = { mustahikId: "", assetType: "CASH", amount: "" };

function fmt(n) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function DistributionItemForm({
    programId,
    mustahik: mustahikProp = [],
    balance = {},
    existingIds = [],
    wilayahOptions = [],
}) {
  const router = useRouter();
    const [form, setForm] = useState(BLANK);
    const [wilayahFilter, setWilayahFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [showConfirmExisting, setShowConfirmExisting] = useState(false);

    const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

    // Ensure mustahik is always an array
    const mustahik = Array.isArray(mustahikProp) ? mustahikProp : [];

    // ── Saldo ──
    const cashAvailable = balance.cashAvailable ?? 0;
    const riceAvailable = balance.riceAvailable ?? 0;

    // ── Validasi over-saldo ──
    const amount = parseFloat(form.amount) || 0;
    const curAvailable = form.assetType === "CASH" ? cashAvailable : riceAvailable;
    const isOverBalance = amount > 0 && amount > curAvailable;

    // ── Filter mustahik by wilayah ──
    const filteredMustahik = Array.isArray(mustahik)
        ? (wilayahFilter
            ? mustahik.filter((m) => {
                if (!m.wilayah?.name) return false;
                const a = m.wilayah.name.trim().replace(/\s+/g, "").toLowerCase();
                const b = wilayahFilter.trim().replace(/\s+/g, "").toLowerCase();
                return a === b;
            })
            : mustahik)
        : []; 

    const doSubmit = async () => {
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
        setConfirmAdd(false);
        router.push(`/admin/programs/${programId}`);
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOverBalance) {
            toast.error("Jumlah melebihi saldo yang tersedia.");
            return;
        }
      if (form.mustahikId && existingIds.includes(form.mustahikId) && !confirmAdd) {
          setShowConfirmExisting(true);
          return;
      }
      doSubmit();
  };

    const handleConfirmExisting = () => {
        setShowConfirmExisting(false);
        setConfirmAdd(true);
        doSubmit();
    };

    return (
      <div className="space-y-4">
          {/* ── Compact saldo ── */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex flex-wrap gap-4 text-sm text-gray-700">
              <span>
                  💵 Uang tersedia:{" "}
                  <strong className={cashAvailable < 0 ? "text-red-600" : "text-green-700"}>
                      {fmt(cashAvailable)}
                  </strong>
              </span>
              <span>
                  🌾 Beras tersedia:{" "}
                  <strong className={riceAvailable < 0 ? "text-red-600" : "text-amber-700"}>
                      {Number(riceAvailable).toFixed(2)} kg
                  </strong>
              </span>
          </div>

          {/* ── Form tambah penerima ── */}
          <ZakatCard accent>
              <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <UserPlus className="w-4 h-4 text-green-700" />
                  Tambah Penerima
              </h3>

              {mustahik.length === 0 ? (
                  <p className="text-sm text-gray-500 bg-amber-50 px-3 py-2 rounded-lg">
                      Tidak ada mustahik aktif ditemukan.{" "}
                      <a href="/admin/mustahik" className="text-green-700 font-medium hover:underline">
                          Tambah mustahik terlebih dahulu →
                      </a>
                  </p>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Filter wilayah */}
                          {wilayahOptions.length > 0 && (
                              <ZakatFormField label="Filter Wilayah">
                                  <select
                                      className={selectCls}
                                      value={wilayahFilter}
                                      onChange={(e) => {
                                          const v = e.target.value.trim();
                                          setWilayahFilter(v);
                                          setForm((p) => ({ ...p, mustahikId: "" }));
                                      }}
                                  >
                                      <option value="">— Semua wilayah —</option>
                                        {wilayahOptions.map((w) => {
                                            const name = w.name.trim();
                                            return (
                                                <option key={w.id} value={name}>
                                                    {capitalize(name)}
                                                </option>
                                            );
                                        })}
                                  </select>
                              </ZakatFormField>
                          )}

                          <ZakatFormField label="Penerima (Mustahik)" required>
                              <select
                                  className={selectCls}
                                  value={form.mustahikId}
                                  onChange={set("mustahikId")}
                                  required
                              >
                                  <option value="">— Pilih mustahik —</option>
                                  {filteredMustahik.map((m) => (
                                      <option key={m.id} value={m.id}>
                                          {m.name} ({m.category})
                        {m.wilayah ? ` — ${capitalize(m.wilayah.name)}` : ""}
                    </option>
                ))}
                              </select>
                              {wilayahFilter && filteredMustahik.length === 0 && (
                                  <p className="text-xs text-amber-600 mt-1">
                                      Tidak ada mustahik aktif di wilayah ini.
                                  </p>
                              )}
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
                                      className={`${inputCls} ${isOverBalance ? "border-red-400 focus:ring-red-300 focus:border-red-400" : ""}`}
                                      placeholder={form.assetType === "CASH" ? "100000" : "2.5"}
                                      value={form.amount}
                                      onChange={set("amount")}
                                      required
                                  />
                              </ZakatFormField>
                          </div>

                          {/* Sisa saldo setelah penambahan */}
                          {amount > 0 && !isOverBalance && (
                              <p className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                                  Setelah penambahan ini, sisa saldo:{" "}
                                  <strong>
                                      {form.assetType === "CASH"
                                          ? fmt(cashAvailable - amount)
                                          : `${(riceAvailable - amount).toFixed(2)} kg`}
                                  </strong>
                              </p>
                          )}

                          {isOverBalance && (
                              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg flex items-center gap-1.5">
                                  <AlertTriangle className="w-4 h-4 shrink-0" />
                                  Jumlah melebihi saldo tersedia (
                                  {form.assetType === "CASH" ? fmt(cashAvailable) : `${riceAvailable.toFixed(2)} kg`}
                                  ). Harap sesuaikan jumlah atau tambah saldo terlebih dahulu.
                              </p>
                          )}

                          {error && (
                              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                          )}

                      <ZakatButton
                          type="submit"
                          loading={loading}
                          disabled={isOverBalance}
                          className="w-full justify-center"
                      >
                          Tambahkan ke Program
                      </ZakatButton>
                  </form>
              )}
          </ZakatCard>

          <ConfirmDialog
              open={showConfirmExisting}
              title="Konfirmasi Duplikat"
              description="Mustahik ini sudah ditambahkan ke program. Apakah Anda yakin ingin menambahkannya lagi?"
              confirmLabel="Ya, tetap tambahkan"
              onConfirm={handleConfirmExisting}
              onClose={() => setShowConfirmExisting(false)}
          />
      </div>
  );
}
