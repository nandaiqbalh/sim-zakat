// app/admin/transactions/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getTransactionsByMosque, getZakatBalance } from "@/lib/repositories/transaction.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import BalanceCards from "@/components/transactions/BalanceCards";
import TransactionList from "@/components/transactions/TransactionList";
import Link from "next/link";

export const metadata = { title: "Transaksi Zakat — SIM Zakat" };

export default async function TransactionsPage({ searchParams }) {
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

  const page      = parseInt(searchParams.page || "1", 10) || 1;
  const search    = searchParams.search || "";
  const assetType = searchParams.assetType || "";

  const [balanceRes, txRes] = await Promise.all([
    getZakatBalance(mosque.id),
    getTransactionsByMosque({
      mosqueId: mosque.id,
      page,
      limit: 10,
      search,
      assetType,
    }),
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

      {/* filters + add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <form method="get" className="flex gap-2 flex-wrap">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Cari nama muzakki..."
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
          />
          <select
            name="assetType"
            defaultValue={assetType}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
          >
            <option value="">Semua jenis</option>
            <option value="CASH">Uang</option>
            <option value="RICE">Beras</option>
          </select>
          {/* keep page parameter when filtering by resetting */}
        </form>
        <Link
          href="/admin/transactions/add"
          className="inline-flex items-center gap-1 bg-green-700 hover:bg-green-800 text-white font-medium text-sm px-4 py-2 rounded-xl transition"
        >
          + Tambah Transaksi
        </Link>
      </div>
      <TransactionList
        transactions={txRes.data?.transactions ?? []}
        page={txRes.data?.page}
        total={txRes.data?.total}
        limit={txRes.data?.limit}
      />
    </div>
  );
}
