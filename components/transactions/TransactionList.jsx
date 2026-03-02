"use client";
// components/transactions/TransactionList.jsx
import { useState } from "react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatBadge from "@/components/zakat/ZakatBadge";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import { ClipboardList, Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import TransactionForm from "./TransactionForm";
import { deleteTransactionAction, listTransactionsAction } from "@/lib/actions/transaction.actions";
import { useRouter } from "next/navigation";

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

export default function TransactionList({
  transactions = [],
  page = 1,
  total = 0,
  limit = 10,
  search: initialSearch = "",
  assetType: initialAssetType = "",
}) {
  const router = useRouter();
  const [editingTx, setEditingTx] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [currPage, setCurrPage] = useState(page);
  const [currTotal, setCurrTotal] = useState(total);
  const [currTransactions, setCurrTransactions] = useState(transactions);
  const lastPage = Math.max(1, Math.ceil(currTotal / limit));
  // build params from props (supplied by server) rather than window
  const baseParams = new URLSearchParams();
  if (initialSearch) baseParams.set("search", initialSearch);
  if (initialAssetType) baseParams.set("assetType", initialAssetType);
  const pathname = "/admin/transactions";

  const handleDelete = async () => {
    const res = await deleteTransactionAction(confirm.id);
    setConfirm({ open: false, id: null });
    if (res.success) {
      // simply refresh page
      window.location.reload();
    } else {
      alert(res.message);
    }
  };

  const changePage = async (newPage) => {
    if (newPage < 1 || newPage > lastPage) return;
    const res = await listTransactionsAction({ page: newPage, search: initialSearch, assetType: initialAssetType });
    if (res.success) {
      setCurrTransactions(res.data.transactions);
      setCurrTotal(res.data.total);
      setCurrPage(newPage);
      // update URL
      const params = new URLSearchParams(baseParams.toString());
      if (newPage > 1) params.set("page", newPage);
      else params.delete("page");
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { shallow: true });
    } else {
      alert(res.message);
    }
  };

  const buildLink = (newPage) => {
    const params = new URLSearchParams(baseParams.toString());
    if (newPage && newPage > 1) params.set("page", newPage);
    else params.delete("page");
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <ZakatCard>
      <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <ClipboardList className="w-4 h-4 text-green-700" />
        Transaksi Terbaru
        <span className="ml-auto text-xs font-normal text-gray-400">
          {currTotal} entri
        </span>
      </h3>

      {transactions.length === 0 ? (
        <ZakatEmptyState
          title="Belum ada transaksi"
          description="Gunakan tombol Tambah Transaksi untuk mulai mencatat."
        />
      ) : (
          <ZakatTable headers={["Tanggal", "Muzakki", "Jenis", "Jumlah", "Catatan", "Petugas", "Aksi"]}>
            {currTransactions.map((tx) => (
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
              <ZakatTd className="whitespace-normal break-words">
                {tx.note || "—"}
              </ZakatTd>
              <ZakatTd className="text-xs text-gray-500">
                {tx.createdBy?.name ?? tx.createdBy?.email ?? "—"}
              </ZakatTd>
              <ZakatTd className="flex gap-2">
                <button
                  onClick={() => setEditingTx(tx)}
                  title="Edit"
                  className="p-1 text-blue-500 hover:text-blue-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setConfirm({ open: true, id: tx.id })}
                  title="Hapus"
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </ZakatTd>
            </ZakatTr>
          ))}
        </ZakatTable>
      )}
      {editingTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <TransactionForm
              transaction={editingTx}
              onSuccess={() => window.location.reload()}
              onCancel={() => setEditingTx(null)}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirm.open}
        title="Hapus Transaksi"
        description="Apakah Anda yakin ingin menghapus transaksi ini?"
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={handleDelete}
        onClose={() => setConfirm({ open: false, id: null })}
      />

      {currTotal > limit && (
        <div className="mt-4 flex justify-between text-sm">
          <a
            href={buildLink(currPage - 1)}
            onClick={(e) => { e.preventDefault(); changePage(currPage - 1); }}
            className={`px-3 py-1 rounded ${currPage > 1 ? "bg-green-100 text-green-700" : "text-gray-400"}`}
          >
            Sebelumnya
          </a>
          <span className="text-gray-500">
            {currPage} / {lastPage}
          </span>
          <a
            href={buildLink(currPage + 1)}
            onClick={(e) => { e.preventDefault(); changePage(currPage + 1); }}
            className={`px-3 py-1 rounded ${currPage < lastPage ? "bg-green-100 text-green-700" : "text-gray-400"}`}
          >
            Berikutnya
          </a>
        </div>
      )}
    </ZakatCard>
  );
}
