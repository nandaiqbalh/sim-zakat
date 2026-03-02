// app/admin/mustahik/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId, findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import { getMustahikByMosque } from "@/lib/repositories/mustahik.repository";
import { getWilayahByMosque } from "@/lib/repositories/wilayah.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import MustahikPageClient from "./MustahikPageClient";
import Link from "next/link";
import Unauthorized from "@/components/ui/Unauthorized";

export const metadata = { title: "Mustahik — SIM Zakat" };

export default async function MustahikPage({ searchParams }) {
  const session   = await getServerSession(authOptions);
  const userMosqueRes = await findMosqueUserByUserId(session.user.id);

  if (!userMosqueRes.success || !userMosqueRes.data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">Masjid tidak ditemukan. Silakan daftarkan masjid terlebih dahulu.</p>
        <Link href="/admin/mosque" className="text-green-700 font-medium hover:underline">
          Atur masjid →
        </Link>
      </div>
    );
  }

  if (userMosqueRes.data.role !== "MANAGER") {
    return <Unauthorized message="Anda tidak memiliki akses ke halaman data mustahik." />;
  }

  const mosqueRes = await findMosqueByUserId(session.user.id);

  // read filters from URL (optional)
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1", 10) || 1;
  const filterWilayah = sp?.wilayah || "";
  const name = sp?.name || "";
  const category = sp?.category || "";

  const [mustahikRes, wilayahRes] = await Promise.all([
    getMustahikByMosque({
      mosqueId: mosqueRes.data.id,
      page,
      limit: 10,
      wilayah: filterWilayah,
      name,
      category,
    }),
    getWilayahByMosque(mosqueRes.data.id),
  ]);
  const initialData = mustahikRes.data ?? { mustahiks: [], total: 0, page: 1, limit: 10, wilayah: filterWilayah, name, category };
  const wilayahOptions = wilayahRes.data ?? [];

  return (
    <div>
      <ZakatPageHeader title="Data Mustahik" description="Kelola penerima zakat." />
      <MustahikPageClient initialData={initialData} wilayahOptions={wilayahOptions} />
    </div>
  );
}
