// app/admin/mustahik/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getMustahikByMosque } from "@/lib/repositories/mustahik.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import MustahikPageClient from "./MustahikPageClient";
import Link from "next/link";

export const metadata = { title: "Mustahik — SIM Zakat" };

export default async function MustahikPage() {
  const session   = await getServerSession(authOptions);
  const mosqueRes = await findMosqueByUserId(session.user.id);

  if (!mosqueRes.success || !mosqueRes.data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">Masjid tidak ditemukan. Silakan daftarkan masjid terlebih dahulu.</p>
        <Link href="/admin/mosque" className="text-green-700 font-medium hover:underline">
          Atur masjid →
        </Link>
      </div>
    );
  }

  const mustahikRes = await getMustahikByMosque({ mosqueId: mosqueRes.data.id });
  const mustahik    = mustahikRes.data ?? [];

  const activeCount   = mustahik.filter((m) => m.isActive).length;
  const inactiveCount = mustahik.length - activeCount;

  return (
    <div>
      <ZakatPageHeader title="Data Mustahik" description="Kelola penerima zakat." />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-2xl font-bold text-gray-900">{mustahik.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-xl border border-green-200 shadow-sm p-5 text-center">
          <p className="text-2xl font-bold text-green-700">{activeCount}</p>
          <p className="text-xs text-gray-500 mt-1">Aktif</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-2xl font-bold text-gray-400">{inactiveCount}</p>
          <p className="text-xs text-gray-500 mt-1">Tidak aktif</p>
        </div>
      </div>

      <MustahikPageClient mustahik={mustahik} />
    </div>
  );
}
