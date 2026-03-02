// components/superadmin/transactions/PlatformTotalsCards.jsx
import { Building2, Banknote, Wheat } from "lucide-react";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n ?? 0);

/**
 * Three summary cards: mosque count, total cash, total rice.
 * @param {{ platformTotals: { totalMosques: number, totalCash: number, totalRice: number } }} props
 */
export default function PlatformTotalsCards({ platformTotals = {} }) {
  const { totalMosques = 0, totalCash = 0, totalRice = 0 } = platformTotals;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard icon={Building2} iconCls="bg-indigo-50" iconColor="text-indigo-600" label="Masjid dengan Transaksi">
        <span className="text-2xl font-bold text-gray-900">{totalMosques}</span>
      </SummaryCard>
      <SummaryCard icon={Banknote} iconCls="bg-green-50" iconColor="text-green-600" label="Total Uang (Platform)">
        <span className="text-xl font-bold text-green-700">{fmt(totalCash)}</span>
      </SummaryCard>
      <SummaryCard icon={Wheat} iconCls="bg-amber-50" iconColor="text-amber-600" label="Total Beras (Platform)">
        <span className="text-xl font-bold text-amber-700">{(totalRice ?? 0).toLocaleString("id-ID")} kg</span>
      </SummaryCard>
    </div>
  );
}

function SummaryCard({ icon: Icon, iconCls, iconColor, label, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl shrink-0 ${iconCls}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        {children}
      </div>
    </div>
  );
}
