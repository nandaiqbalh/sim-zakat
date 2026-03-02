// app/admin/mosque/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId, findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import { getMosqueUsers } from "@/lib/repositories/mosque.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import Unauthorized from "@/components/ui/Unauthorized";
import MosqueSetupForm from "@/components/mosque/MosqueSetupForm";
import MosqueInfo from "@/components/mosque/MosqueInfo";
import MosquePageClient from "./MosquePageClient";

export const metadata = { title: "Masjid — SIM Zakat" };

export default async function MosquePage() {
  const session    = await getServerSession(authOptions);
  const userMosqueRes = await findMosqueUserByUserId(session.user.id);
  if (!userMosqueRes.success || !userMosqueRes.data) {
    // no mosque record at all
    return (
      <div>
        <ZakatPageHeader
          title="Pengaturan Masjid"
          description="Daftarkan masjid Anda untuk mulai mengelola zakat."
        />
        <MosqueSetupForm />
      </div>
    );
  }

  // only managers may manage mosque settings
  if (userMosqueRes.data.role !== "MANAGER") {
    return <Unauthorized message="Anda tidak memiliki akses pengaturan masjid." />;
  }
  const mosqueRes  = await findMosqueByUserId(session.user.id);
  // convert to plain object to avoid prototype issues when sending to client components
  const mosque = mosqueRes.data ? JSON.parse(JSON.stringify(mosqueRes.data)) : null;

  if (!mosque) {
    return (
      <div>
        <ZakatPageHeader
          title="Pengaturan Masjid"
          description="Daftarkan masjid Anda untuk mulai mengelola zakat."
        />
        <MosqueSetupForm />
      </div>
    );
  }

  const staffRes = await getMosqueUsers(mosque.id);
  // earlier we converted mosque; staff entries need the same treatment
  // ensure staff entries are plain objects as well
  const staff = (staffRes.data ?? []).map((u) => JSON.parse(JSON.stringify(u)));

  return (
    <div>
      <ZakatPageHeader
        title="Manajemen Masjid"
        description="Kelola informasi masjid dan anggota staf Anda."
      />
      <MosqueInfo mosque={mosque} />
      <MosquePageClient mosque={mosque} staff={staff} />
    </div>
  );
}
