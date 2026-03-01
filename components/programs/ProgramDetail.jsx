// components/programs/ProgramDetail.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, Trash2, Clock, CheckCheck } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatBadge from "@/components/zakat/ZakatBadge";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { distributeItemAction, removeDistributionItemAction } from "@/lib/actions/program.actions";

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

export default function ProgramDetail({ program }) {
  const router = useRouter();
  const [confirmDistribute, setConfirmDistribute] = useState({ open: false, item: null });
  const [confirmDelete,     setConfirmDelete    ] = useState({ open: false, item: null });
  const [busy, setBusy] = useState({});

  const setItemBusy = (id, val) => setBusy((p) => ({ ...p, [id]: val }));

  const handleDistribute = async () => {
    const item = confirmDistribute.item;
    setItemBusy(item.id, true);
    const res = await distributeItemAction(item.id);
    setItemBusy(item.id, false);
    setConfirmDistribute({ open: false, item: null });

    if (res.success) {
      toast.success(`${item.mustahik.name} berhasil ditandai sudah didistribusikan.`);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async () => {
    const item = confirmDelete.item;
    setItemBusy(item.id, true);
    const res = await removeDistributionItemAction(item.id);
    setItemBusy(item.id, false);
    setConfirmDelete({ open: false, item: null });

    if (res.success) {
      toast.success("Item berhasil dihapus.");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  const items    = program.items ?? [];
  const pending  = items.filter((i) => i.status === "PENDING");
  const done     = items.filter((i) => i.status === "DISTRIBUTED");

    // kelompokkan per mustahik
    const grouped = Object.values(
        items.reduce((acc, item) => {
            const id = item.mustahik.id;
            if (!acc[id]) {
                acc[id] = { mustahik: item.mustahik, cash: 0, rice: 0, pending: 0, distributed: 0 };
            }
            if (item.assetType === "CASH") acc[id].cash += Number(item.amount);
            else acc[id].rice += Number(item.amount);
            if (item.status === "PENDING") acc[id].pending++;
            else if (item.status === "DISTRIBUTED") acc[id].distributed++;
            return acc;
        }, {})
    );

  return (
    <>
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <ZakatCard className="text-center">
          <p className="text-3xl font-bold text-gray-900">{items.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Penerima</p>
        </ZakatCard>
        <ZakatCard className="text-center border-amber-200">
          <p className="text-3xl font-bold text-amber-600">{pending.length}</p>
          <p className="text-xs text-gray-500 mt-1">Menunggu</p>
        </ZakatCard>
        <ZakatCard className="text-center border-green-200">
          <p className="text-3xl font-bold text-green-700">{done.length}</p>
          <p className="text-xs text-gray-500 mt-1">Terdistibusi</p>
        </ZakatCard>
      </div>

      {/* Item table */}
      <ZakatCard>
        <h3 className="text-base font-semibold text-gray-800 mb-4">Daftar Distribusi</h3>

        {items.length === 0 ? (
          <ZakatEmptyState
            title="Belum ada penerima"
            description="Gunakan form di atas untuk menambah mustahik ke program ini."
            icon={Clock}
          />
        ) : (
          <ZakatTable
                          headers={["Penerima", "Kategori", "Tipe", "Jumlah", "Status", "Ringkasan"]}
          >
                          {grouped.map((g) => (
                              <ZakatTr key={g.mustahik.id}>
                                  <ZakatTd className="font-medium">{g.mustahik.name}</ZakatTd>
                <ZakatTd>
                                      <ZakatBadge category={g.mustahik.category} />
                </ZakatTd>
                                  <ZakatTd className="flex gap-1">
                                      {g.cash > 0 && (
                                          <ZakatBadge label="Uang" variant="green" />
                                      )}
                                      {g.rice > 0 && (
                                          <ZakatBadge label="Beras" variant="amber" />
                                      )}
                </ZakatTd>
                <ZakatTd className="font-semibold text-green-700">
                                      {g.cash > 0 && fmt(g.cash)}
                                      {g.cash > 0 && g.rice > 0 && <br />}
                                      {g.rice > 0 && `${g.rice.toFixed(2)} kg`}
                </ZakatTd>
                <ZakatTd>
                                      {g.pending && g.distributed
                                          ? "Campuran"
                                          : g.distributed
                                              ? "Terdistibusi"
                                              : "Menunggu"}
                </ZakatTd>
                                  <ZakatTd className="text-xs text-gray-500">
                                      {g.distributed > 0 && `${g.distributed} selesai`}
                                      {g.distributed > 0 && g.pending > 0 && ", "}
                                      {g.pending > 0 && `${g.pending} menunggu`}
                </ZakatTd>
              </ZakatTr>
            ))}
          </ZakatTable>
        )}
      </ZakatCard>

      <ConfirmDialog
        open={confirmDistribute.open}
        title="Konfirmasi Distribusi"
        description={`Tandai zakat untuk "${confirmDistribute.item?.mustahik?.name}" sudah didistribusikan? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Distribusikan"
        onConfirm={handleDistribute}
        onClose={() => setConfirmDistribute({ open: false, item: null })}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        title="Hapus Item"
        description={`Hapus "${confirmDelete.item?.mustahik?.name}" dari program ini?`}
        confirmLabel="Hapus"
        onConfirm={handleDelete}
        onClose={() => setConfirmDelete({ open: false, item: null })}
      />
    </>
  );
}
