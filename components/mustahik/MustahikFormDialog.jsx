// components/mustahik/MustahikFormDialog.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls, selectCls } from "@/components/zakat/ZakatFormField";
import { addMustahikAction, editMustahikAction } from "@/lib/actions/mustahik.actions";

const CATEGORIES = [
  { value: "FAKIR",        label: "Fakir" },
  { value: "MISKIN",       label: "Miskin" },
  { value: "AMIL",         label: "Amil" },
  { value: "MUALAF",       label: "Mualaf" },
  { value: "GHARIM",       label: "Gharim" },
  { value: "FISABILILLAH", label: "Fisabilillah" },
  { value: "IBNU_SABIL",   label: "Ibnu Sabil" },
];

const BLANK = { name: "", address: "", phone: "", category: "FAKIR", isActive: true };

export default function MustahikFormDialog({ open, onClose, mustahik = null }) {
  const router = useRouter();
  const isEdit = !!mustahik;
  const [form, setForm] = useState(BLANK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        mustahik
          ? {
              name:     mustahik.name     ?? "",
              address:  mustahik.address  ?? "",
              phone:    mustahik.phone    ?? "",
              category: mustahik.category ?? "FAKIR",
              isActive: mustahik.isActive ?? true,
            }
          : BLANK
      );
      setError("");
    }
  }, [open, mustahik]);

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = isEdit
      ? await editMustahikAction(mustahik.id, form)
      : await addMustahikAction(form);

    setLoading(false);

    if (res.success) {
      toast.success(isEdit ? "Data mustahik berhasil diperbarui." : "Mustahik berhasil ditambahkan.");
      onClose();
      router.refresh();
    } else {
      setError(res.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          {isEdit ? "Edit Mustahik" : "Tambah Mustahik Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ZakatFormField label="Nama Lengkap" required>
            <input
              type="text"
              className={inputCls}
              placeholder="misal: Budi Santoso"
              value={form.name}
              onChange={set("name")}
              required
            />
          </ZakatFormField>

          <ZakatFormField label="Kategori" required>
            <select className={selectCls} value={form.category} onChange={set("category")}> 
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </ZakatFormField>

          <ZakatFormField label="Alamat">
            <textarea
              className={inputCls + " resize-none"}
              rows={2}
              placeholder="Alamat jalan…"
              value={form.address}
              onChange={set("address")}
            />
          </ZakatFormField>

          <ZakatFormField label="Nomor HP">
            <input
              type="tel"
              className={inputCls}
              placeholder="08xxxxxxxxxx"
              value={form.phone}
              onChange={set("phone")}
            />
          </ZakatFormField>

          {isEdit && (
            <ZakatFormField label="Status">
              <select
                className={selectCls}
                value={form.isActive ? "true" : "false"}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isActive: e.target.value === "true" }))
                }
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak aktif</option>
              </select>
            </ZakatFormField>
          )}

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
              {isEdit ? "Simpan Perubahan" : "Tambah Mustahik"}
            </ZakatButton>
          </div>
        </form>
      </div>
    </div>
  );
}
