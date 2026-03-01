// app/admin/programs/[id]/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getMustahikByMosque } from "@/lib/repositories/mustahik.repository";
import { getProgramById } from "@/lib/repositories/program.repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import ProgramDetail from "@/components/programs/ProgramDetail";
import DistributionItemForm from "@/components/programs/DistributionItemForm";

export async function generateMetadata({ params }) {
  return { title: `Program Distribusi — SIM Zakat` };
}

export default async function ProgramDetailPage({ params }) {
  // params from App Router may be a promise; unwrap it
  const { id } = await params;
  if (!id) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-3">ID parameter tidak tersedia.</p>
      </div>
    );
  }

  const session = await getServerSession(authOptions);

  const [mosqueRes, programRes] = await Promise.all([
    findMosqueByUserId(session.user.id),
    getProgramById(id),
  ]);

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

  if (!programRes.success || !programRes.data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">
          Program tidak ditemukan. {programRes.message && `(${programRes.message})`}
        </p>
        <p className="text-sm text-gray-500 mb-3">ID: {id}</p>
        <Link href="/admin/programs" className="text-green-700 font-medium hover:underline">
          Kembali ke daftar program →
        </Link>
      </div>
    );
  }

  const program = programRes.data;

  // Verifikasi program milik masjid ini
  if (program.mosqueId !== mosqueRes.data.id) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">Anda tidak memiliki akses ke program ini.</p>
        <Link href="/admin/programs" className="text-green-700 font-medium hover:underline">
          Kembali ke daftar program →
        </Link>
      </div>
    );
  }

  const mustahikRes  = await getMustahikByMosque({ mosqueId: mosqueRes.data.id, onlyActive: true });
  const mustahik     = mustahikRes.data ?? [];

  const createdAt = new Date(program.createdAt).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link
          href="/admin/programs"
          className="flex items-center gap-1 hover:text-green-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Program
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{program.name}</span>
      </div>

      <ZakatPageHeader
        title={program.name}
        description={`Dibuat oleh ${program.createdBy?.name ?? "—"} · ${createdAt}`}
      />

      <DistributionItemForm programId={id} mustahik={mustahik} />
      <ProgramDetail program={program} />
    </div>
  );
}
