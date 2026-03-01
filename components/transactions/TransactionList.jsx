// components/transactions/TransactionList.jsx
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatBadge from "@/components/zakat/ZakatBadge";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import { ClipboardList } from "lucide-react";

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function fmtDate(d) {
  return new Date(d).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TransactionList({ transactions = [], page = 1, total = 0, limit = 10 }) {
  const lastPage = Math.max(1, Math.ceil(total / limit));
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const buildLink = (newPage) => {
    const params = new URLSearchParams(search.toString());
    if (newPage && newPage > 1) params.set("page", newPage);
    else params.delete("page");
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ZakatCard>
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <ClipboardList className="w-4 h-4 text-green-700" />
        Transaksi Terbaru
        <span className="ml-auto text-xs font-normal text-gray-400">
          {total} entri
        </span>
      </h3>

      {transactions.length === 0 ? (
        <ZakatEmptyState
          title="Belum ada transaksi"
          description="Gunakan tombol Tambah Transaksi untuk mulai mencatat."
        />
      ) : (
        <ZakatTable headers={["Tanggal", "Muzakki", "Jenis", "Jumlah", "Petugas"]}>
          {transactions.map((tx) => (
            <ZakatTr key={tx.id}>
              <ZakatTd className="whitespace-nowrap text-xs text-gray-500">
                {fmtDate(tx.createdAt)}
              </ZakatTd>
              <ZakatTd className="font-medium">{tx.muzakki?.name ?? "—"}</ZakatTd>
              <ZakatTd>
                <ZakatBadge
                  label={tx.assetType === "CASH" ? "Tunai" : "Beras"}
                  variant={tx.assetType === "CASH" ? "green" : "amber"}
                />
              </ZakatTd>
              <ZakatTd className="font-semibold text-green-700">
                {tx.assetType === "CASH"
                  ? fmt(tx.amount)
                  : `${Number(tx.amount).toFixed(2)} kg`}
              </ZakatTd>
              <ZakatTd className="text-xs text-gray-500">
                {tx.createdBy?.name ?? tx.createdBy?.email ?? "—"}
              </ZakatTd>
            </ZakatTr>
          ))}
        </ZakatTable>
      )}
      {total > limit && (
        <div className="mt-4 flex justify-between text-sm">
          <a
            href={buildLink(page - 1)}
            className={`px-3 py-1 rounded ${page > 1 ? "bg-green-100 text-green-700" : "text-gray-400"}`}
          >
            Sebelumnya
          </a>
          <span className="text-gray-500">
            {page} / {lastPage}
          </span>
          <a
            href={buildLink(page + 1)}
            className={`px-3 py-1 rounded ${page < lastPage ? "bg-green-100 text-green-700" : "text-gray-400"}`}
          >
            Berikutnya
          </a>
        </div>
      )}
    </ZakatCard>
  );
}
