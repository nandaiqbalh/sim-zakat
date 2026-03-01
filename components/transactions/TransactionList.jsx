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

export default function TransactionList({ transactions = [] }) {
  return (
    <ZakatCard>
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <ClipboardList className="w-4 h-4 text-green-700" />
        Transaksi Terbaru
        <span className="ml-auto text-xs font-normal text-gray-400">
          {transactions.length} entri
        </span>
      </h3>

      {transactions.length === 0 ? (
        <ZakatEmptyState
          title="Belum ada transaksi"
          description="Catat zakat masuk pertama menggunakan formulir di sebelah kiri."
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
    </ZakatCard>
  );
}
