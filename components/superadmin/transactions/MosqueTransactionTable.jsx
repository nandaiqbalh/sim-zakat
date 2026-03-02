// components/superadmin/transactions/MosqueTransactionTable.jsx
import { ArrowDownToLine } from "lucide-react";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n ?? 0);

/**
 * Per-mosque transaction summary table with a totals footer row.
 * @param {{ mosques: Array<{ id: string, name: string, address?: string, txCount: number, cashTotal: number, riceTotal: number }> }} props
 */
export default function MosqueTransactionTable({ mosques = [] }) {
  if (mosques.length === 0) {
    return (
      <div className="text-center py-14 text-gray-400">
        <ArrowDownToLine className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Belum ada transaksi tercatat.</p>
      </div>
    );
  }

  const grandCash  = mosques.reduce((s, m) => s + m.cashTotal, 0);
  const grandRice  = mosques.reduce((s, m) => s + m.riceTotal, 0);
  const grandCount = mosques.reduce((s, m) => s + m.txCount, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-left">
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Masjid</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">
              Jumlah Transaksi
            </th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-right">
              Total Uang
            </th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-right">
              Total Beras
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {mosques.map((m, i) => (
            <tr key={m.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">{m.name}</p>
                    {m.address && (
                      <p className="text-xs text-gray-400 truncate max-w-xs">{m.address}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-center">
                <span className="inline-block px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                  {m.txCount}
                </span>
              </td>
              <td className="px-5 py-4 text-right font-semibold text-green-700">
                {fmt(m.cashTotal)}
              </td>
              <td className="px-5 py-4 text-right font-semibold text-amber-700">
                {(m.riceTotal ?? 0).toLocaleString("id-ID")} kg
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 border-t border-gray-200 font-semibold">
            <td className="px-5 py-3 text-sm text-gray-700">Total Platform</td>
            <td className="px-5 py-3 text-center text-sm text-gray-700">{grandCount}</td>
            <td className="px-5 py-3 text-right text-sm text-green-700">{fmt(grandCash)}</td>
            <td className="px-5 py-3 text-right text-sm text-amber-700">
              {grandRice.toLocaleString("id-ID")} kg
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
