// components/mosque/AddStaffDialog.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, X } from "lucide-react";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls, selectCls } from "@/components/zakat/ZakatFormField";
import { addStaffAction } from "@/lib/actions/mosque.actions";

export default function AddStaffDialog({ open, onClose, mosqueId }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", mosqueRole: "DISTRIBUTOR" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await addStaffAction(mosqueId, form);
    setLoading(false);

    if (res.success) {
      toast.success("Staf berhasil ditambahkan.");
      setForm({ name: "", email: "", password: "", phone: "", mosqueRole: "DISTRIBUTOR" });
      onClose();
      router.refresh();
    } else {
      setError(res.message);
    }
  };

  if (!open) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Tambah Staf Masjid</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <ZakatFormField label="Nama Lengkap" required>
            <input
              type="text"
              className={inputCls}
              placeholder="Ahmad Fauzi"
              value={form.name}
              onChange={set("name")}
              required
            />
          </ZakatFormField>

          <ZakatFormField label="Email" required>
            <input
              type="email"
              className={inputCls}
              placeholder="staf@masjid.id"
              value={form.email}
              onChange={set("email")}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Jika email belum terdaftar, akun baru akan dibuat otomatis.
            </p>
          </ZakatFormField>

          <ZakatFormField label="Kata Sandi" required>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={inputCls}
                placeholder="Min. 6 karakter"
                value={form.password}
                onChange={set("password")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </ZakatFormField>

          <ZakatFormField label="Nomor HP">
            <input
              type="tel"
              className={inputCls}
              placeholder="081234567890 (opsional)"
              value={form.phone}
              onChange={set("phone")}
            />
          </ZakatFormField>

          <ZakatFormField label="Peran" required>
            <select
              className={selectCls}
              value={form.mosqueRole}
              onChange={set("mosqueRole")}
            >
              <option value="MANAGER">Manajer – Kelola sistem &amp; laporan</option>
              <option value="DISTRIBUTOR">Distributor – Distribusi zakat</option>
            </select>
          </ZakatFormField>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <ZakatButton variant="secondary" onClick={onClose} className="flex-1 justify-center" type="button">
              Batal
            </ZakatButton>
            <ZakatButton type="submit" loading={loading} className="flex-1 justify-center">
              Tambah Staf
            </ZakatButton>
          </div>
        </form>
      </div>
    </div>
  );
}
