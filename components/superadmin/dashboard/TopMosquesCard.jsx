// components/superadmin/dashboard/TopMosquesCard.jsx
import Link from "next/link";
import { Building2 } from "lucide-react";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n ?? 0);

/**
 * Card showing the top 5 mosques ranked by transaction count.
 * @param {{ mosques: Array<{ id: string, name: string, txCount: number, cashTotal: number, riceTotal: number }> }} props
 */
export default function TopMosquesCard({ mosques = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-800">Masjid Paling Aktif</h2>
        <Link href="/superadmin/transactions" className="text-xs text-indigo-600 hover:underline">
          Lihat semua →
        </Link>
      </div>

      {mosques.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">Belum ada data transaksi.</p>
      ) : (
        <div className="space-y-3">
          {mosques.map((m, i) => (
            <div key={m.id} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{m.name}</p>
                <p className="text-xs text-gray-400">{m.txCount} transaksi</p>
              </div>
              <div className="text-right text-xs shrink-0">
                <p className="font-semibold text-green-700">{fmt(m.cashTotal)}</p>
                <p className="text-gray-400">{(m.riceTotal ?? 0).toLocaleString("id-ID")} kg</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
