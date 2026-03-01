import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { bebasNeue, dmSans } from "@/lib/fonts";
import { display404, bodyText } from "@/lib/styles";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for was not found or is no longer available.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">

      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Halaman tidak ditemukan</p>
      <p className="text-sm text-gray-500 mb-8 max-w-xs">
        Halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau sementara tidak tersedia.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          Kembali ke Beranda
        </Link>
        <BackButton />
      </div>

    </main>
  );
}