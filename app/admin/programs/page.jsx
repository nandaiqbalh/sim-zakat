// app/admin/programs/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId, findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import { getProgramsByMosque } from "@/lib/repositories/program.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import ProgramsPageClient from "./ProgramsPageClient";
import Link from "next/link";
import Unauthorized from "@/components/ui/Unauthorized";

export const metadata = { title: "Program Distribusi — SIM Zakat" };

export default async function ProgramsPage() {
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

  const role = userMosqueRes.data.role;
  if (role !== "MANAGER" && role !== "DISTRIBUTOR") {
    return <Unauthorized message="Anda tidak memiliki akses ke halaman program." />;
  }

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

  const programsRes = await getProgramsByMosque(mosqueRes.data.id);
  const programs    = programsRes.data ?? [];

  return (
    <div>
      <ZakatPageHeader
        title="Program Distribusi"
        description="Buat dan kelola program distribusi zakat."
      />
      <ProgramsPageClient programs={programs} role={role} />
    </div>
  );
}
