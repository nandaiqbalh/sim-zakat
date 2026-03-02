// components/superadmin/programs/ProgramTable.jsx
import { Package, CheckCircle2, Clock } from "lucide-react";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n ?? 0);

const STATUS_LABELS = {
  ACTIVE: { label: "Aktif",   cls: "bg-green-100 text-green-700" },
  CLOSED: { label: "Selesai", cls: "bg-gray-100 text-gray-600" },
  DRAFT:  { label: "Draft",   cls: "bg-yellow-100 text-yellow-700" },
};

/**
 * Table of distribution programs across all mosques.
 * @param {{ programs: Array }} props
 */
export default function ProgramTable({ programs = [] }) {
  if (programs.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Tidak ada program ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-left">
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Program</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Masjid</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">Status</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">Item</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">Distribusi</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-right">Uang / Beras</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {programs.map((p) => {
            const st = STATUS_LABELS[p.status] ?? { label: p.status, cls: "bg-gray-100 text-gray-600" };
            return (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </td>
                <td className="px-5 py-4 text-gray-700">{p.mosque?.name ?? "—"}</td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${st.cls}`}>
                    {st.label}
                  </span>
                </td>
                <td className="px-5 py-4 text-center text-xs font-semibold text-gray-700">
                  {p._count?.items ?? 0}
                </td>
                <td className="px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-xs text-green-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {p.distributed}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {p.pending}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  {p.cashOut > 0 && (
                    <p className="text-xs font-semibold text-green-700">{fmt(p.cashOut)}</p>
                  )}
                  {p.riceOut > 0 && (
                    <p className="text-xs font-semibold text-amber-700">
                      {p.riceOut.toLocaleString("id-ID")} kg
                    </p>
                  )}
                  {p.cashOut === 0 && p.riceOut === 0 && (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
