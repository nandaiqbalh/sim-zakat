"use client";
// components/calculator/ZakatFitrahCalculator.jsx

import { useState, useCallback } from "react";
import { Calculator, Info, RotateCcw, CheckCircle2 } from "lucide-react";

const FORMAT_CURRENCY = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
const FORMAT_NUMBER = (n) =>
  new Intl.NumberFormat("id-ID").format(n);

// Kemenag standard: 2.5 kg beras per jiwa per tahun
const DEFAULT_KG_PER_JIWA = 2.5;
// Approximate reference price (Kemenag 2024/2025 commonly Rp 35.000 – Rp 50.000/kg)
const DEFAULT_PRICE_PER_KG = 14000;

const INFO_ITEMS = [
  "Zakat fitrah diwajibkan bagi setiap muslim yang mampu pada malam hari raya Idul Fitri.",
  "Besaran zakat fitrah adalah 1 sha' makanan pokok, setara ±2,5 kg atau 3,5 liter beras.",
  "Boleh dibayar dalam bentuk beras maupun uang senilai harga beras di daerah setempat.",
  "Kewajiban mencakup diri sendiri dan seluruh anggota keluarga yang menjadi tanggungan.",
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

export default function ZakatFitrahCalculator() {
  const [jiwa, setJiwa] = useState(1);
  const [paymentType, setPaymentType] = useState("UANG"); // BERAS | UANG
  const [pricePerKg, setPricePerKg] = useState(DEFAULT_PRICE_PER_KG);
  const [kgPerJiwa, setKgPerJiwa] = useState(DEFAULT_KG_PER_JIWA);

  const totalKg = jiwa * kgPerJiwa;
  const totalRupiah = totalKg * pricePerKg;

  const handleReset = () => {
    setJiwa(1);
    setPaymentType("UANG");
    setPricePerKg(DEFAULT_PRICE_PER_KG);
    setKgPerJiwa(DEFAULT_KG_PER_JIWA);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          <Calculator className="w-3.5 h-3.5" />
          Kalkulator Zakat Fitrah
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hitung Zakat Fitrah</h1>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          Hitung total kewajiban zakat fitrah untuk diri dan keluarga Anda berdasarkan ketentuan Kemenag RI.
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
            {/* Jumlah jiwa */}
            <InputRow
              label="Jumlah Jiwa"
              hint="Termasuk diri sendiri dan tanggungan"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setJiwa((v) => Math.max(1, v - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition"
                >−</button>
                <input
                  type="number"
                  min={1}
                  value={jiwa}
                  onChange={(e) => setJiwa(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-center font-semibold"
                />
                <button
                  onClick={() => setJiwa((v) => v + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition"
                >+</button>
              </div>
            </InputRow>

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
                        ? "border-green-500 bg-green-50"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                    <span className="text-xs text-gray-400 mt-0.5">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Berat per jiwa */}
            <div className="pt-5">
              <InputRow
                label="Berat per Jiwa"
                hint="Standar Kemenag: 2,5 kg per jiwa"
              >
                <div className="relative">
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={kgPerJiwa}
                    onChange={(e) => setKgPerJiwa(parseFloat(e.target.value) || 0)}
                    className={inputCls + " pr-10"}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">kg</span>
                </div>
              </InputRow>
            </div>

            {/* Harga per kg (only when uang) */}
            {paymentType === "UANG" && (
              <div className="pt-5">
                <InputRow
                  label="Harga Beras per Kg"
                  hint="Sesuaikan dengan harga pasar daerah Anda"
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
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-700"
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
          <div className="bg-gradient-to-br from-green-700 to-emerald-800 text-white rounded-2xl p-6 shadow-lg">
            <p className="text-xs font-medium uppercase tracking-widest text-green-200 mb-1">Total Kewajiban</p>
            <p className="text-sm text-green-100 mb-4">{jiwa} jiwa × {kgPerJiwa} kg/jiwa</p>

            <div className="bg-white/10 rounded-xl p-4 mb-4 text-center">
              <p className="text-3xl font-bold">{FORMAT_NUMBER(totalKg)} <span className="text-lg font-normal text-green-200">kg</span></p>
              <p className="text-xs text-green-300 mt-1">Total beras</p>
            </div>

            {paymentType === "UANG" && (
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{FORMAT_CURRENCY(totalRupiah)}</p>
                <p className="text-xs text-green-300 mt-1">Setara uang tunai</p>
              </div>
            )}
          </div>

          {/* Per jiwa breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Rincian per Jiwa</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Beras</span>
                <span className="font-semibold text-gray-800">{FORMAT_NUMBER(kgPerJiwa)} kg</span>
              </div>
              {paymentType === "UANG" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Nilai uang</span>
                  <span className="font-semibold text-gray-800">{FORMAT_CURRENCY(kgPerJiwa * pricePerKg)}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold">
                <span className="text-gray-700">Total {jiwa} jiwa</span>
                <span className="text-green-700">
                  {paymentType === "UANG" ? FORMAT_CURRENCY(totalRupiah) : `${FORMAT_NUMBER(totalKg)} kg`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-sm font-semibold text-amber-800">Ketentuan Zakat Fitrah</p>
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
