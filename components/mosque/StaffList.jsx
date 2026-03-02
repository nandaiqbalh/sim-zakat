// components/mosque/StaffList.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Trash2, UserCog } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatBadge from "@/components/zakat/ZakatBadge";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { removeStaffAction } from "@/lib/actions/mosque.actions";

const ROLE_VARIANT = { MANAGER: "green", DISTRIBUTOR: "blue" };
const ROLE_LABEL   = { MANAGER: "Manajer", DISTRIBUTOR: "Distributor" };

export default function StaffList({ staff, onAdd }) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [confirm, setConfirm] = useState({ open: false, id: null, name: "" });
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    const res = await removeStaffAction(confirm.id);
    setRemoving(false);
    setConfirm({ open: false, id: null, name: "" });

    if (res.success) {
      toast.success(`${confirm.name} berhasil dihapus dari masjid.`);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <ZakatCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <UserCog className="w-4 h-4 text-green-700" />
            Daftar Staf
          </h3>
          <ZakatButton size="sm" onClick={onAdd}>+ Tambah Staf</ZakatButton>
        </div>

        {staff.length === 0 ? (
          <ZakatEmptyState
            title="Belum ada staf"
            description="Tambahkan manajer dan distributor untuk mulai mengelola zakat."
          />
        ) : (
          <ZakatTable headers={["Nama", "Email", "Peran", "Aksi"]}>
            {staff.map((s) => (
              <ZakatTr key={s.id}>
                <ZakatTd className="font-medium">{s.user.name ?? "—"}</ZakatTd>
                <ZakatTd>{s.user.email}</ZakatTd>
                <ZakatTd>
                  <ZakatBadge
                    label={ROLE_LABEL[s.role]}
                    variant={ROLE_VARIANT[s.role] ?? "gray"}
                  />
                </ZakatTd>
                <ZakatTd>
                  {s.user.id !== currentUserId && (
                    <button
                      onClick={() => setConfirm({ open: true, id: s.id, name: s.user.name ?? s.user.email })}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Hapus dari masjid"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {s.user.id === currentUserId && (
                    <span className="text-gray-400 text-sm">(Anda)</span>
                  )}
                </ZakatTd>
              </ZakatTr>
            ))}
          </ZakatTable>
        )}
      </ZakatCard>

      <ConfirmDialog
        open={confirm.open}
        title="Hapus Staf"
        description={`Apakah Anda yakin ingin menghapus ${confirm.name} dari masjid ini?`}
        confirmLabel={removing ? "Menghapus…" : "Hapus"}
        cancelLabel="Batal"
        onConfirm={handleRemove}
        onClose={() => setConfirm({ open: false, id: null, name: "" })}
      />
    </>
  );
}
