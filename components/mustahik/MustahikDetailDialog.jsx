// components/mustahik/MustahikDetailDialog.jsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ZakatButton from "@/components/zakat/ZakatButton";

export default function MustahikDetailDialog({ open, onClose, mustahik = null }) {
  if (!mustahik) return null;

  const { name, address, phone, category, isActive, wilayah } = mustahik;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Mustahik</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-800">Nama</p>
            <p className="mt-1 text-base font-medium text-gray-900">{name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Kategori</p>
            <p className="mt-1">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                {category}
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Wilayah</p>
            <p className="mt-1">{wilayah?.name ?? "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Alamat</p>
            <p className="mt-1 break-words">{address || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Telepon</p>
            <p className="mt-1">{phone || "-"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Status</p>
            <p className="mt-1">
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {isActive ? "Aktif" : "Tidak aktif"}
              </span>
            </p>
          </div>
        </div>
        <DialogFooter>
          <ZakatButton onClick={onClose}>Tutup</ZakatButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
