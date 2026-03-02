// app/admin/conversions/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId, findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import { getZakatBalance } from "@/lib/repositories/transaction.repository";
import { getConversionsByMosque } from "@/lib/repositories/conversion.repository";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import ConversionForm from "@/components/conversions/ConversionForm";
import ConversionHistory from "@/components/conversions/ConversionHistory";
import Link from "next/link";
import Unauthorized from "@/components/ui/Unauthorized";

export const metadata = { title: "Konversi Aset — SIM Zakat" };

export default async function ConversionsPage() {
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

  // only managers have conversion access
  if (userMosqueRes.data.role !== "MANAGER") {
    return <Unauthorized message="Anda tidak memiliki akses ke halaman konversi." />;
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

  const mosque = mosqueRes.data;

  const [balanceRes, conversionsRes] = await Promise.all([
    getZakatBalance(mosque.id),
    getConversionsByMosque(mosque.id),
  ]);

  const cashBalance  = balanceRes.data?.cashBalance ?? 0;
  const conversions  = conversionsRes.data ?? [];

  return (
    <div>
      <ZakatPageHeader
        title="Konversi Aset"
        description="Ubah zakat tunai menjadi beras untuk distribusi. Semua catatan bersifat permanen."
      />
      <ConversionForm cashBalance={cashBalance} />
      <ConversionHistory conversions={conversions} />
    </div>
  );
}
