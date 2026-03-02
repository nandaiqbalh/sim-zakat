// components/programs/ProgramList.jsx
import Link from "next/link";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import ZakatButton from "@/components/zakat/ZakatButton";
import { Package, ChevronRight, CalendarDays } from "lucide-react";

function fmtDate(d) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function ProgramList({ programs, onCreate }) {
  if (programs.length === 0) {
    return (
      <ZakatEmptyState
        title="Belum ada program"
        description="Buat program distribusi untuk mulai merencanakan penyaluran zakat."
        icon={Package}
        action={
          onCreate ? <ZakatButton onClick={onCreate}>+ Program Baru</ZakatButton> : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {programs.map((p) => {
        const total      = p._count?.items ?? 0;
        return (
          <ZakatCard key={p.id} className="hover:border-green-200 transition-colors">
            <Link
              href={`/admin/programs/${p.id}`}
              className="flex items-center gap-4 group"
            >
              <div className="p-2.5 bg-green-50 rounded-lg shrink-0">
                <Package className="w-5 h-5 text-green-700" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors truncate">
                  {p.name}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <CalendarDays className="w-3 h-3" />
                  {fmtDate(p.createdAt)} &middot; Dibuat oleh {p.createdBy?.name ?? "—"}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-green-700">{total}</p>
                <p className="text-xs text-gray-400">penerima</p>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-700 transition-colors shrink-0" />
            </Link>
          </ZakatCard>
        );
      })}
    </div>
  );
}
