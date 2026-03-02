// components/superadmin/dashboard/RecentActivityCard.jsx
import Link from "next/link";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n ?? 0);

/**
 * Card showing the 20 most recent transactions across all mosques.
 * @param {{ transactions: Array }} props
 */
export default function RecentActivityCard({ transactions = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-800">Transaksi Terbaru</h2>
        <Link href="/superadmin/transactions" className="text-xs text-indigo-600 hover:underline">
          Lihat semua →
        </Link>
      </div>

      {transactions.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">Belum ada transaksi.</p>
      ) : (
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-start gap-3 text-xs">
              <div
                className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                  tx.assetType === "CASH" ? "bg-green-500" : "bg-amber-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{tx.muzakki?.name ?? "—"}</p>
                <p className="text-gray-400 truncate">{tx.mosque?.name ?? "—"}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-gray-700">
                  {tx.assetType === "CASH" ? fmt(tx.amount) : `${tx.amount} kg`}
                </p>
                <p className="text-gray-400">
                  {new Date(tx.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
