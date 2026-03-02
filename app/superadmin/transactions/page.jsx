// app/superadmin/transactions/page.jsx
import { getTransactionSummary } from "@/lib/services/superadmin.service";
import SuperAdminPageHeader from "@/components/superadmin/shared/SuperAdminPageHeader";
import PlatformTotalsCards from "@/components/superadmin/transactions/PlatformTotalsCards";
import MosqueTransactionTable from "@/components/superadmin/transactions/MosqueTransactionTable";

export const metadata = { title: "Ringkasan Transaksi — Super Admin SIM Zakat" };

export default async function SuperAdminTransactionsPage() {
  const res = await getTransactionSummary();
  const { mosques = [], platformTotals = {} } = res.data ?? {};

  return (
    <div className="space-y-6">
      <SuperAdminPageHeader
        title="Ringkasan Transaksi"
        description="Rekap penerimaan zakat seluruh masjid di platform."
      />

      <PlatformTotalsCards platformTotals={platformTotals} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800">Per Masjid</h2>
          <span className="text-xs text-gray-400">{mosques.length} masjid</span>
        </div>
        <MosqueTransactionTable mosques={mosques} />
      </div>
    </div>
  );
}
