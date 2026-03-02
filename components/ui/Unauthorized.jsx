// components/ui/Unauthorized.jsx

// A simple component to display a 403-style access denied message.
// This can be used in both server and client components since it has no hooks.

import { ShieldAlert } from "lucide-react";

export default function Unauthorized({
  message = "Anda tidak memiliki hak akses untuk melihat halaman ini.",
  title = "403 - Akses Ditolak",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <ShieldAlert className="w-12 h-12 text-red-600 mb-4" />
      <p className="text-lg font-semibold text-red-700 mb-2">{title}</p>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
}
