// app/admin/programs/[id]/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { findMosqueByUserId, findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import { getProgramById } from "@/lib/repositories/program.repository";
import { getZakatBalance } from "@/lib/repositories/transaction.repository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, PlusCircle } from "lucide-react";
import ZakatPageHeader from "@/components/zakat/ZakatPageHeader";
import Unauthorized from "@/components/ui/Unauthorized";
import ProgramDetail from "@/components/programs/ProgramDetail";
import ProgramBalanceCard from "@/components/programs/ProgramBalanceCard";

export async function generateMetadata({ params }) {
    return { title: `Program Distribusi — SIM Zakat` };
}

export default async function ProgramDetailPage({ params }) {
    const { id } = await params;
    if (!id) {
        return (
            <div className="text-center py-20">
                <p className="text-red-600 mb-3">ID parameter tidak tersedia.</p>
            </div>
        );
    }

    const session = await getServerSession(authOptions);

    const [mosqueRes, mosqueUserRes, programRes] = await Promise.all([
        findMosqueByUserId(session.user.id),
        findMosqueUserByUserId(session.user.id),
        getProgramById(id),
    ]);

    const role = mosqueUserRes?.data?.role;
    if (role !== "MANAGER" && role !== "DISTRIBUTOR") {
        return <Unauthorized message="Anda tidak memiliki akses ke halaman program." />;
    }

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

    if (program.mosqueId !== mosqueRes.data.id) {
        return (
            <>
                <Unauthorized message="Anda tidak memiliki akses ke program ini." />
                <div className="text-center mt-4">
                <Link href="/admin/programs" className="text-green-700 font-medium hover:underline">
                    Kembali ke daftar program →
                </Link>
                </div>
            </>
        );
    }

    const isManager = mosqueUserRes?.data?.role === "MANAGER";

    const balanceRes = await getZakatBalance(mosqueRes.data.id);
    const balance = balanceRes.data ?? {};

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

            <div className="flex items-start justify-between gap-4 mb-6">
                <ZakatPageHeader
                    title={program.name}
                    description={`Dibuat oleh ${program.createdBy?.name ?? "—"} · ${createdAt}`}
                />
                {isManager && (
                    <Link
                        href={`/admin/programs/${id}/add`}
                        className="shrink-0 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium text-sm px-4 py-2 rounded-xl transition"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Tambah Distribusi
                    </Link>
                )}
            </div>

            {/* Saldo + Kalkulator */}
            <ProgramBalanceCard balance={balance} />

            {/* Daftar distribusi */}
            <ProgramDetail program={program} />
        </div>
    );
}


