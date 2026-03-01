"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function SuccessDialog({
  open,
  title,
  description,
  onClose,
  confirmLabel = "OK",
  onConfirm,
  showConfirm = true,
}) {
  const handleConfirm = onConfirm ?? onClose;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h2 className="text-sm font-semibold text-gray-900">{title || "Berhasil"}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Body */}
        {description && (
          <div className="px-5 py-4">
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        )}
        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex justify-end">
          {showConfirm && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition"
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
