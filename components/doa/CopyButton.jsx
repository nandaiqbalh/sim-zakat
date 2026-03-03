"use client";
// components/doa/CopyButton.jsx

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-green-200 hover:text-white transition-colors shrink-0 cursor-pointer"
      title="Salin teks Arab"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-300" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      <span className="hidden sm:inline">{copied ? "Disalin!" : "Salin"}</span>
    </button>
  );
}
