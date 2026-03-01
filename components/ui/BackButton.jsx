"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton({ className = "" }) {
  return (
    <button
      onClick={() => window.history.back()}
      className={`inline-flex items-center justify-center h-10 gap-2 px-4 border border-green-700 text-green-700 rounded hover:bg-green-50 transition ${className}`}
    >
      <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
      <span className="text-sm font-medium">Kembali</span>
    </button>
  );
}
