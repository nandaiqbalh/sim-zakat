// app/admin/mosque/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getMosqueUsers } from "@/lib/repositories/mosque.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import MosqueSetupForm from "@/components/mosque/MosqueSetupForm";
import MosqueInfo from "@/components/mosque/MosqueInfo";
import MosquePageClient from "./MosquePageClient";

export const metadata = { title: "Masjid — SIM Zakat" };

export default async function MosquePage() {
  const session    = await getServerSession(authOptions);
  const mosqueRes  = await findMosqueByUserId(session.user.id);
  const mosque     = mosqueRes.data;

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
  const staff    = staffRes.data ?? [];

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
