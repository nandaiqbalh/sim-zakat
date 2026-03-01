// app/admin/transactions/add/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import TransactionForm from "@/components/transactions/TransactionForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";

export async function generateMetadata({ params }) {
  return { title: `Tambah Transaksi — SIM Zakat` };
}

export default async function AddTransactionPage() {
  const session = await getServerSession(authOptions);
  const mosqueRes = await findMosqueByUserId(session.user.id);

  if (!mosqueRes.success || !mosqueRes.data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">Masjid tidak ditemukan.</p>
        <Link href="/admin/mosque" className="text-green-700 font-medium hover:underline">
          Atur masjid →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link
          href="/admin/transactions"
          className="flex items-center gap-1 hover:text-green-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Transaksi
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Tambah</span>
      </div>

      <ZakatPageHeader title="Tambah Transaksi" description="Catat pemasukan zakat baru." />

      <TransactionForm redirectTo="/admin/transactions" />
    </div>
  );
}
