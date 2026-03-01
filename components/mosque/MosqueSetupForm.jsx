// components/mosque/MosqueSetupForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Building2 } from "lucide-react";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatButton from "@/components/zakat/ZakatButton";
import ZakatFormField, { inputCls } from "@/components/zakat/ZakatFormField";
import { setupMosqueAction } from "@/lib/actions/mosque.actions";

export default function MosqueSetupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await setupMosqueAction({ name, address });
    setLoading(false);

    if (res.success) {
      toast.success("Masjid berhasil dibuat! Silakan logout dan login kembali untuk memperbarui akses Anda.");
      router.refresh();
    } else {
      setError(res.message);
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-green-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Daftarkan Masjid Anda</h2>
        <p className="mt-2 text-sm text-gray-500">
          Daftarkan masjid Anda untuk mulai mengelola zakat jamaah.
        </p>
      </div>

      <ZakatCard>
        <form onSubmit={handleSubmit} className="space-y-5">
          <ZakatFormField label="Nama Masjid" required error={undefined}>
            <input
              className={inputCls}
              type="text"
              placeholder="misal: Masjid Al-Ikhlas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </ZakatFormField>

          <ZakatFormField label="Alamat" error={undefined}>
            <textarea
              className={inputCls + " resize-none"}
              rows={3}
              placeholder="Jl. Mawar No. 1, Jakarta"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </ZakatFormField>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <ZakatButton type="submit" loading={loading} className="w-full justify-center" size="lg">
            Daftarkan Masjid
          </ZakatButton>
        </form>
      </ZakatCard>
    </div>
  );
}
