// app/admin/programs/[id]/add/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId, findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import { getMustahikByMosque } from "@/lib/repositories/mustahik.repository";
import { getProgramById } from "@/lib/repositories/program.repository";
import { getZakatBalance } from "@/lib/repositories/transaction.repository";
import { getWilayahByMosque } from "@/lib/repositories/wilayah.repository";
import Link from "next/link";
import { ChevronLeft, ShieldAlert } from "lucide-react";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import DistributionItemForm from "@/components/programs/DistributionItemForm";

export async function generateMetadata({ params }) {
  return { title: `Tambah Distribusi — SIM Zakat` };
}

export default async function AddDistributionPage({ params }) {
  const { id } = await params;
  if (!id) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">ID parameter tidak tersedia.</p>
      </div>
    );
  }

  const session = await getServerSession(authOptions);

  const [mosqueRes, mosqueUserRes, programRes] = await Promise.all([
    findMosqueByUserId(session.user.id),
    findMosqueUserByUserId(session.user.id),
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
        <p className="text-gray-600 mb-3">Program tidak ditemukan.</p>
        <Link href="/admin/programs" className="text-green-700 font-medium hover:underline">
          Kembali →
        </Link>
      </div>
    );
  }

  const program = programRes.data;

  if (program.mosqueId !== mosqueRes.data.id) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-3">Anda tidak memiliki akses ke program ini.</p>
        <Link href="/admin/programs" className="text-green-700 font-medium hover:underline">
          Kembali →
        </Link>
      </div>
    );
  }

  const isManager = mosqueUserRes?.data?.role === "MANAGER";

  const [mustahikRes, balanceRes, wilayahRes] = await Promise.all([
    getMustahikByMosque({ mosqueId: mosqueRes.data.id, onlyActive: true }),
    getZakatBalance(mosqueRes.data.id),
    getWilayahByMosque(mosqueRes.data.id),
  ]);

  const mustahik   = mustahikRes.data ?? [];
  const balance    = balanceRes.data  ?? {};
  const wilayah    = wilayahRes.data  ?? [];
  const existingIds = program.items?.map((i) => i.mustahik.id) ?? [];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link
          href={`/admin/programs/${id}`}
          className="flex items-center gap-1 hover:text-green-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {program.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Tambah Distribusi</span>
      </div>

      <ZakatPageHeader
        title="Tambah Distribusi"
        description={`Menambahkan penerima ke program: ${program.name}`}
      />

      {!isManager ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">Akses Dibatasi</p>
            <p className="text-sm text-amber-700 mt-1">
              Hanya manager masjid yang dapat menambahkan distribusi ke program.
            </p>
          </div>
        </div>
      ) : (
        <DistributionItemForm
          programId={id}
          mustahik={mustahik}
          balance={balance}
          existingIds={existingIds}
          wilayahOptions={wilayah}
        />
      )}
    </div>
  );
}
