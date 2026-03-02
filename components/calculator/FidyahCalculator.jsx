"use client";
// components/calculator/FidyahCalculator.jsx

import { useState } from "react";
import { Calculator, Info, RotateCcw, CheckCircle2 } from "lucide-react";

const FORMAT_CURRENCY = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
const FORMAT_NUMBER = (n) =>
  new Intl.NumberFormat("id-ID").format(n);

// Standar Kemenag: 1 mud = ±0.675 kg makanan pokok per hari per jiwa
const DEFAULT_MUD_KG = 0.675;
// Nilai fidyah per hari (umumnya senilai makanan pokok satu hari)
const DEFAULT_PRICE_PER_KG = 14000;

const REASON_OPTIONS = [
  { value: "SAKIT", label: "Sakit yang tidak ada harapan sembuh" },
  { value: "TUA", label: "Lansia / uzur yang tidak mampu berpuasa" },
  { value: "HAMIL", label: "Hamil / menyusui (khawatir anak)" },
  { value: "SAFAR", label: "Musafir (perjalanan jauh)" },
];

const INFO_ITEMS = [
  "Fidyah wajib dibayarkan oleh orang yang tidak mampu berpuasa karena uzur tertentu (sakit parah, usia tua).",
  "Besarnya fidyah adalah 1 mud (±675 gram) makanan pokok per hari yang ditinggalkan.",
  "Fidyah boleh dibayar berupa beras/makanan langsung atau berupa uang senilainya.",
  "Fidyah dibayarkan kepada fakir miskin, idealnya 1 jiwa fidyah untuk 1 orang miskin.",
  "Untuk hamil/menyusui: dianjurkan juga disertai qadha' (mengganti puasa di hari lain).",
];

function InputRow({ label, hint, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
      <div className="sm:w-52">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-right";

export default function FidyahCalculator() {
  const [orang, setOrang] = useState(1);
  const [hari, setHari] = useState(1);
  const [paymentType, setPaymentType] = useState("UANG");
  const [mudKg, setMudKg] = useState(DEFAULT_MUD_KG);
  const [pricePerKg, setPricePerKg] = useState(DEFAULT_PRICE_PER_KG);
  const [reason, setReason] = useState("SAKIT");

  const totalKg = orang * hari * mudKg;
  const totalRupiah = totalKg * pricePerKg;
  const perHari = hari * mudKg;
  const perHariRp = perHari * pricePerKg;

  const handleReset = () => {
    setOrang(1);
    setHari(1);
    setPaymentType("UANG");
    setMudKg(DEFAULT_MUD_KG);
    setPricePerKg(DEFAULT_PRICE_PER_KG);
    setReason("SAKIT");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          <Calculator className="w-3.5 h-3.5" />
          Kalkulator Fidyah
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hitung Fidyah</h1>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          Hitung kewajiban fidyah berdasarkan jumlah orang dan hari yang perlu diganti sesuai ketentuan Kemenag RI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form card */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">Data Perhitungan</h2>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div className="space-y-5 divide-y divide-gray-50">
            {/* Alasan fidyah */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Alasan Fidyah</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {REASON_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setReason(opt.value)}
                    className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs transition-all ${
                      reason === opt.value
                        ? "border-teal-500 bg-teal-50 text-teal-800 font-semibold"
                        : "border-gray-100 text-gray-600 hover:border-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jumlah orang */}
            <div className="pt-5">
              <InputRow
                label="Jumlah Orang"
                hint="Orang yang membayar fidyah"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOrang((v) => Math.max(1, v - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition"
                  >−</button>
                  <input
                    type="number"
                    min={1}
                    value={orang}
                    onChange={(e) => setOrang(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-semibold"
                  />
                  <button
                    onClick={() => setOrang((v) => v + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition"
                  >+</button>
                </div>
              </InputRow>
            </div>

            {/* Jumlah hari */}
            <div className="pt-5">
              <InputRow
                label="Jumlah Hari"
                hint="Hari puasa Ramadan yang ditinggalkan"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHari((v) => Math.max(1, v - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition"
                  >−</button>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={hari}
                    onChange={(e) => setHari(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-semibold"
                  />
                  <button
                    onClick={() => setHari((v) => Math.min(30, v + 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition"
                  >+</button>
                </div>
              </InputRow>
              {hari === 30 && (
                <p className="text-xs text-teal-600 mt-1 text-right">Satu bulan penuh Ramadan</p>
              )}
            </div>

            {/* Jenis pembayaran */}
            <div className="pt-5">
              <p className="text-sm font-medium text-gray-700 mb-2">Jenis Pembayaran</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "BERAS", label: "🌾  Beras", desc: "Bayar dalam bentuk beras" },
                  { value: "UANG", label: "💵  Uang", desc: "Bayar dalam bentuk rupiah" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPaymentType(opt.value)}
                    className={`flex flex-col items-start px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      paymentType === opt.value
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                    <span className="text-xs text-gray-400 mt-0.5">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mud per hari */}
            <div className="pt-5">
              <InputRow
                label="Berat per Hari per Jiwa"
                hint="Standar: 1 mud = ±0,675 kg"
              >
                <div className="relative">
                  <input
                    type="number"
                    min={0.1}
                    step={0.025}
                    value={mudKg}
                    onChange={(e) => setMudKg(parseFloat(e.target.value) || 0)}
                    className={inputCls + " pr-10"}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">kg</span>
                </div>
              </InputRow>
            </div>

            {/* Harga per kg */}
            {paymentType === "UANG" && (
              <div className="pt-5">
                <InputRow
                  label="Harga Beras per Kg"
                  hint="Sesuaikan harga pasar daerah Anda"
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">Rp</span>
                    <input
                      type="number"
                      min={1000}
                      step={500}
                      value={pricePerKg}
                      onChange={(e) => setPricePerKg(parseInt(e.target.value) || 0)}
                      className={inputCls + " pl-9"}
                    />
                  </div>
                </InputRow>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[12000, 14000, 16000, 18000, 20000].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPricePerKg(p)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        pricePerKg === p
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-700"
                      }`}
                    >
                      {FORMAT_CURRENCY(p)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result card */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main result */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-widest text-teal-200 mb-1">Total Fidyah</p>
            <p className="text-sm text-teal-100 mb-4">
              {orang} orang × {hari} hari × {mudKg} kg
            </p>

            <div className="bg-white/10 rounded-xl p-4 mb-4 text-center">
              <p className="text-3xl font-bold">{FORMAT_NUMBER(totalKg)} <span className="text-lg font-normal text-teal-200">kg</span></p>
              <p className="text-xs text-teal-300 mt-1">Total beras</p>
            </div>

            {paymentType === "UANG" && (
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{FORMAT_CURRENCY(totalRupiah)}</p>
                <p className="text-xs text-teal-300 mt-1">Setara uang tunai</p>
              </div>
            )}
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Rincian</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Per hari ({orang} orang)</span>
                <span className="font-medium text-gray-800">
                  {paymentType === "UANG" ? FORMAT_CURRENCY(perHariRp) : `${FORMAT_NUMBER(perHari)} kg`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Jumlah hari</span>
                <span className="font-medium text-gray-800">{hari} hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Jumlah orang</span>
                <span className="font-medium text-gray-800">{orang} orang</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold">
                <span className="text-gray-700">Total</span>
                <span className="text-teal-700">
                  {paymentType === "UANG" ? FORMAT_CURRENCY(totalRupiah) : `${FORMAT_NUMBER(totalKg)} kg`}
                </span>
              </div>
            </div>
          </div>

          {/* Distribusi info */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
            <p className="text-xs font-semibold text-teal-700 mb-1">💡 Distribusi Fidyah</p>
            <p className="text-xs text-teal-600 leading-relaxed">
              Fidyah {orang * hari} hari dibagikan kepada minimal <strong>{orang * hari} orang miskin</strong>.
              Satu orang miskin menerima fidyah satu hari dari satu orang pembayar fidyah.
            </p>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-sm font-semibold text-amber-800">Ketentuan Fidyah</p>
        </div>
        <ul className="space-y-2">
          {INFO_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
