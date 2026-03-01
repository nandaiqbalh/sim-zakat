// components/programs/ProgramFormDialog.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls } from "@/components/zakat/ZakatFormField";
import { createProgramAction } from "@/lib/actions/program.actions";

export default function ProgramFormDialog({ open, onClose }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await createProgramAction({ name });
    setLoading(false);

    if (res.success) {
      toast.success("Program distribusi berhasil dibuat.");
      setName("");
      onClose();
      router.push(`/admin/programs/${res.data.id}`);
    } else {
      setError(res.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Program Distribusi Baru</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ZakatFormField label="Nama Program" required>
            <input
              type="text"
              className={inputCls}
              placeholder="misal: Distribusi Ramadhan 1447 H"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </ZakatFormField>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <ZakatButton
              variant="secondary"
              onClick={onClose}
              type="button"
              className="flex-1 justify-center"
            >
              Batal
            </ZakatButton>
            <ZakatButton
              type="submit"
              loading={loading}
              className="flex-1 justify-center"
            >
              Buat
            </ZakatButton>
          </div>
        </form>
      </div>
    </div>
  );
}
