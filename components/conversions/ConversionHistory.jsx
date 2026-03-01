// components/conversions/ConversionHistory.jsx
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import { History } from "lucide-react";

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function ConversionHistory({ conversions = [] }) {
  return (
    <ZakatCard>
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <History className="w-4 h-4 text-green-700" />
        Riwayat Konversi
        <span className="ml-auto text-xs font-normal text-gray-400">
          {conversions.length} catatan
        </span>
      </h3>

      {conversions.length === 0 ? (
        <ZakatEmptyState
          title="Belum ada konversi"
          description="Konversi uang ke beras untuk mulai merencanakan distribusi."
        />
      ) : (
        <ZakatTable headers={["Tanggal", "Dari (Uang)", "Harga (Rp/kg)", "Ke (Beras)", "Petugas"]}>
          {conversions.map((c) => (
            <ZakatTr key={c.id}>
              <ZakatTd className="text-xs text-gray-500 whitespace-nowrap">
                {fmtDate(c.createdAt)}
              </ZakatTd>
              <ZakatTd className="font-semibold text-red-600">
                − {fmt(c.fromAmount)}
              </ZakatTd>
              <ZakatTd className="text-gray-500">{fmt(c.rate)}</ZakatTd>
              <ZakatTd className="font-semibold text-green-700">
                + {Number(c.toAmount).toFixed(2)} kg
              </ZakatTd>
              <ZakatTd className="text-xs text-gray-500">
                {c.createdBy?.name ?? "—"}
              </ZakatTd>
            </ZakatTr>
          ))}
        </ZakatTable>
      )}
    </ZakatCard>
  );
}
