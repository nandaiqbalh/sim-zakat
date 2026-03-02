// app/docs/layout.js
import { dmSans } from "@/lib/fonts";
import DocsNav from "@/components/docs/DocsNav";

export const metadata = {
  title: "Panduan Penggunaan — SIM Zakat",
  description: "Dokumentasi lengkap cara penggunaan Sistem Informasi Manajemen Zakat.",
};

export default function DocsLayout({ children }) {
  return (
    <div className={`${dmSans.className}`}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-50">
        <DocsNav />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
