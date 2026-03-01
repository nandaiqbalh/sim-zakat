// components/programs/DistributionItemForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus, Calculator, AlertTriangle, ShieldAlert } from "lucide-react";
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
        style: "currency", currency: "IDR", minimumFractionDigits: 0,
    }).format(Number(n) || 0);
}

export default function DistributionItemForm({ programId, mustahik, balance = {}, isManager = false, existingIds = [] }) {
  const router = useRouter();
    const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [kgPerPack, setKgPerPack] = useState("");
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [showConfirmExisting, setShowConfirmExisting] = useState(false);

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

    // ── Saldo ──
    const cashAvailable = balance.cashAvailable ?? 0;
    const riceAvailable = balance.riceAvailable ?? 0;
    const cashPending = balance.cashPending ?? 0;
    const ricePending = balance.ricePending ?? 0;

    // ── Validasi over-saldo ──
    const amount = parseFloat(form.amount) || 0;
    const curAvailable = form.assetType === "CASH" ? cashAvailable : riceAvailable;
    const isOverBalance = amount > 0 && amount > curAvailable;

    // ── Kalkulator bungkus beras ──
    const kgPerPackNum = parseFloat(kgPerPack) || 0;
    const totalRice = riceAvailable + ricePending;           // saldo beras total (sudah terdistribusi dikecualikan)
    const totalPacksPossible = kgPerPackNum > 0 ? Math.floor(totalRice / kgPerPackNum) : 0;
    const packsPending = kgPerPackNum > 0 ? Math.floor(ricePending / kgPerPackNum) : 0;
    const packsAvailable = kgPerPackNum > 0 ? Math.floor(riceAvailable / kgPerPackNum) : 0;

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
      router.refresh();
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
        // check existing
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
        <div className="mb-6 space-y-4">
            {/* ── Kartu saldo masjid ── */}
            <ZakatCard className="border-blue-100 bg-blue-50/40">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-blue-500" />
                    Saldo Masjid
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">💵 Uang Tersedia</p>
                        <p className={`text-lg font-bold ${cashAvailable < 0 ? "text-red-600" : "text-green-700"}`}>
                            {fmt(cashAvailable)}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Tertunda (pending): {fmt(cashPending)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">🌾 Beras Tersedia</p>
                        <p className={`text-lg font-bold ${riceAvailable < 0 ? "text-red-600" : "text-amber-600"}`}>
                            {Number(riceAvailable).toFixed(2)} kg
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Tertunda (pending): {Number(ricePending).toFixed(2)} kg</p>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    Saldo tersedia = saldo bersih dikurangi item yang masih <em>pending</em> di semua program.
                </p>
            </ZakatCard>

            {/* ── Kalkulator bungkus beras ── */}
            <ZakatCard className="border-amber-100 bg-amber-50/30">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-amber-600" />
                    Kalkulator Bungkus Beras
                </h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                    <ZakatFormField label="Berat per bungkus (kg)" className="w-full sm:w-40 shrink-0">
                        <input
                            type="number"
                            min="0.1"
                            step="0.1"
                            className={inputCls}
                            placeholder="misal: 2.5"
                            value={kgPerPack}
                            onChange={(e) => setKgPerPack(e.target.value)}
                        />
                    </ZakatFormField>
                    <div className="grid grid-cols-3 gap-2 flex-1 w-full pb-0.5">
                        <div className="text-center bg-white rounded-lg p-2 border border-amber-100">
                            <p className="text-xs text-gray-500 leading-tight">Total bungkus</p>
                            <p className="text-xl font-bold text-gray-800">{kgPerPackNum > 0 ? totalPacksPossible : "—"}</p>
                        </div>
                        <div className="text-center bg-white rounded-lg p-2 border border-amber-200">
                            <p className="text-xs text-gray-500 leading-tight">Dialokasikan</p>
                            <p className="text-xl font-bold text-amber-600">{kgPerPackNum > 0 ? packsPending : "—"}</p>
                        </div>
                        <div className="text-center bg-white rounded-lg p-2 border border-green-200">
                            <p className="text-xs text-gray-500 leading-tight">Tersisa</p>
                            <p className={`text-xl font-bold ${packsAvailable <= 0 && kgPerPackNum > 0 ? "text-red-600" : "text-green-700"}`}>
                                {kgPerPackNum > 0 ? packsAvailable : "—"}
                            </p>
                        </div>
                    </div>
                </div>
                {kgPerPackNum > 0 && (
                    <p className="text-xs text-gray-400 mt-2">
                        Total beras: <strong>{totalRice.toFixed(2)} kg</strong> →{" "}
                        {totalPacksPossible} bungkus @{kgPerPack} kg ·{" "}
                        sudah dialokasikan {packsPending} bungkus ·{" "}
                        tersisa <strong>{packsAvailable} bungkus</strong>
                    </p>
                )}
            </ZakatCard>

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
                                            <option key={t.value} value={t.value}>{t.label}</option>
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

                            {/* Sisa saldo setelah penambahan ini */}
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
                                    {form.assetType === "CASH" ? fmt(cashAvailable) : `${riceAvailable.toFixed(2)} kg`}).
                                    Harap sesuaikan jumlah atau tambah saldo terlebih dahulu.
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
