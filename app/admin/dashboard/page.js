// app/admin/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getDashboardStats } from "@/lib/services/dashboard.service";
import ToastClient from "@/components/ui/ToastClient";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import Link from "next/link";

export const metadata = { title: "Dashboard — SIM Zakat" };

export default async function AdminDashboardPage({ searchParams }) {
  const showWelcome = searchParams?.toast === "welcome";
  const session = await getServerSession(authOptions);
  const mosqueRes = await findMosqueByUserId(session.user.id);

  let stats = null;
  if (mosqueRes.success && mosqueRes.data) {
    const statsRes = await getDashboardStats(mosqueRes.data.id);
    if (statsRes.success) stats = statsRes.data;
  }

  return (
    <>
      <ToastClient welcome={showWelcome} />
      <ZakatPageHeader
        title={`Selamat datang${session.user.name ? `, ${session.user.name}` : ""}!`}
        description={
          mosqueRes.data
            ? `${mosqueRes.data.name} — ringkasan zakat saat ini`
            : "Masjid belum dikonfigurasi."
        }
      />

      {!mosqueRes.data && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6 text-sm text-amber-800">
          Akun Anda belum terhubung ke masjid mana pun. {" "}
          <Link href="/admin/mosque" className="font-semibold underline hover:text-amber-900">
            Atur masjid Anda →
          </Link>
        </div>
      )}

      <DashboardStats stats={stats} />
    </>
  );
}
