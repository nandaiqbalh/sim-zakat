// app/admin/transactions/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getTransactionsByMosque, getZakatBalance } from "@/lib/repositories/transaction.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import BalanceCards from "@/components/transactions/BalanceCards";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import Link from "next/link";

export const metadata = { title: "Transaksi Zakat — SIM Zakat" };

export default async function TransactionsPage() {
  const session   = await getServerSession(authOptions);
  const mosqueRes = await findMosqueByUserId(session.user.id);

  if (!mosqueRes.success || !mosqueRes.data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">Masjid tidak ditemukan. Silakan daftarkan masjid terlebih dahulu.</p>
        <Link
          href="/admin/mosque"
          className="text-green-700 font-medium hover:underline"
        >
          Atur masjid →
        </Link>
      </div>
    );
  }

  const mosque = mosqueRes.data;

  const [balanceRes, txRes] = await Promise.all([
    getZakatBalance(mosque.id),
    getTransactionsByMosque({ mosqueId: mosque.id, page: 1, limit: 30 }),
  ]);

  return (
    <div>
      <ZakatPageHeader
        title="Transaksi Zakat Masuk"
        description="Catat pemasukan zakat dari muzakki. Muzakki baru akan dibuat secara otomatis."
      />

      {/* Responsive BalanceCards */}
      <div className="mb-6">
        <BalanceCards balance={balanceRes.data} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TransactionForm />
        <TransactionList transactions={txRes.data?.transactions ?? []} />
      </div>
    </div>
  );
}
