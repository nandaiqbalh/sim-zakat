// components/mustahik/MustahikTable.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatBadge from "@/components/zakat/ZakatBadge";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { toggleMustahikAction, removeMustahikAction } from "@/lib/actions/mustahik.actions";

export default function MustahikTable({ mustahik, onEdit }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState({ open: false, id: null, name: "" });
  const [busy, setBusy] = useState({});

  const setItemBusy = (id, val) => setBusy((p) => ({ ...p, [id]: val }));

  const handleToggle = async (m) => {
    setItemBusy(m.id, true);
    const res = await toggleMustahikAction(m.id);
    setItemBusy(m.id, false);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  const handleDelete = async () => {
    setBusy((p) => ({ ...p, [confirm.id]: true }));
    const res = await removeMustahikAction(confirm.id);
    setBusy((p) => ({ ...p, [confirm.id]: false }));
    setConfirm({ open: false, id: null, name: "" });

    if (res.success) {
      toast.success("Mustahik berhasil dihapus.");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  if (mustahik.length === 0) {
    return (
      <ZakatEmptyState
        title="Belum ada mustahik"
        description="Tambahkan penerima zakat untuk mulai merencanakan distribusi."
        action={
          <ZakatButton onClick={() => onEdit(null)} size="sm">
            + Tambah Mustahik Pertama
          </ZakatButton>
        }
      />
    );
  }

  return (
    <>
          <ZakatTable headers={["Nama", "Kategori", "Wilayah", "Alamat", "Status", "Aksi"]}>
        {mustahik.map((m) => (
          <ZakatTr key={m.id}>
            <ZakatTd className="font-medium">{m.name}</ZakatTd>
            <ZakatTd>
              <ZakatBadge category={m.category} />
            </ZakatTd>
                <ZakatTd className="text-gray-500 text-xs">
                    {m.wilayah ? m.wilayah.name.charAt(0).toUpperCase() + m.wilayah.name.slice(1) : "—"}
                </ZakatTd>
                <ZakatTd className="text-gray-500 max-w-[200px] truncate">{m.address || "—"}</ZakatTd>
            <ZakatTd>
              <ZakatBadge
                label={m.isActive ? "Aktif" : "Tidak aktif"}
                variant={m.isActive ? "green" : "gray"}
              />
            </ZakatTd>
            <ZakatTd>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(m)}
                  className="p-1.5 text-gray-500 hover:text-green-700 hover:bg-green-50 rounded transition"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggle(m)}
                  disabled={busy[m.id]}
                  className="p-1.5 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                  title={m.isActive ? "Nonaktifkan" : "Aktifkan"}
                >
                  {m.isActive
                    ? <ToggleRight className="w-4 h-4 text-green-600" />
                    : <ToggleLeft  className="w-4 h-4 text-gray-400" />}
                </button>
                <button
                  onClick={() => setConfirm({ open: true, id: m.id, name: m.name })}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </ZakatTd>
          </ZakatTr>
        ))}
      </ZakatTable>

      <ConfirmDialog
        open={confirm.open}
        title="Hapus Mustahik"
        description={`Apakah Anda yakin ingin menghapus "${confirm.name}" secara permanen?`}
        confirmLabel="Hapus"
        onConfirm={handleDelete}
        onClose={() => setConfirm({ open: false, id: null, name: "" })}
      />
    </>
  );
}
