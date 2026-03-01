"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  description,
  onClose = () => {},

  confirmLabel = "Konfirmasi",
  onConfirm,
  showConfirm = true,

  cancelLabel = "Batal",
  onCancel,
  showCancel = true,

  danger = false,
}) {
  const handleConfirm = onConfirm ?? onClose;
  const handleCancel = onCancel ?? onClose;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-900">{title || "Konfirmasi"}</h2>
          </div>
          <button
            onClick={handleCancel}
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
        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
            >
              {cancelLabel}
            </button>
          )}
          {showConfirm && (
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition ${danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-700 hover:bg-green-800"
                }`}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
