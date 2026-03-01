// components/programs/ProgramBalanceCard.jsx
"use client";

import { useState } from "react";
import { AlertTriangle, Calculator } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatFormField, { inputCls } from "@/components/zakat/ZakatFormField";

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

export default function ProgramBalanceCard({ balance = {} }) {
  const [kgPerPack, setKgPerPack] = useState("");

  const cashAvailable = balance.cashAvailable ?? 0;
  const riceAvailable = balance.riceAvailable ?? 0;
  const cashPending   = balance.cashPending   ?? 0;
  const ricePending   = balance.ricePending   ?? 0;

  const kgPerPackNum       = parseFloat(kgPerPack) || 0;
  const totalRice          = riceAvailable + ricePending;
  const totalPacksPossible = kgPerPackNum > 0 ? Math.floor(totalRice          / kgPerPackNum) : 0;
  const packsPending       = kgPerPackNum > 0 ? Math.floor(ricePending        / kgPerPackNum) : 0;
  const packsAvailable     = kgPerPackNum > 0 ? Math.floor(riceAvailable      / kgPerPackNum) : 0;

  return (
    <div className="space-y-4 mb-6">
      {/* ── Saldo ── */}
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
              <p
                className={`text-xl font-bold ${
                  packsAvailable <= 0 && kgPerPackNum > 0 ? "text-red-600" : "text-green-700"
                }`}
              >
                {kgPerPackNum > 0 ? packsAvailable : "—"}
              </p>
            </div>
          </div>
        </div>
        {kgPerPackNum > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            Total beras: <strong>{totalRice.toFixed(2)} kg</strong> →{" "}
            {totalPacksPossible} bungkus @{kgPerPack} kg · sudah dialokasikan {packsPending} bungkus ·{" "}
            tersisa <strong>{packsAvailable} bungkus</strong>
          </p>
        )}
      </ZakatCard>
    </div>
  );
}
