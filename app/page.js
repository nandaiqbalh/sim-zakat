// app/page.js — Landing Page SIM Zakat
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  Building2,
  ArrowDownToLine,
  Users,
  Package,
  RefreshCcw,
  BarChart3,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "SIM Zakat — Sistem Informasi Manajemen Zakat",
  description: "Platform digital terintegrasi untuk pengelolaan zakat masjid secara akuntabel.",
};

const FEATURES = [
  {
    icon: Building2,
    title: "Manajemen Masjid",
    desc: "Daftarkan masjid dan atur staf pengelola zakat dengan mudah.",
  },
  {
    icon: ArrowDownToLine,
    title: "Penerimaan Zakat",
    desc: "Catat transaksi zakat fitrah, maal, dan infaq secara terstruktur.",
  },
  {
    icon: Users,
    title: "Data Mustahik",
    desc: "Kelola data penerima zakat (mustahik) dengan kategori 8 asnaf.",
  },
  {
    icon: RefreshCcw,
    title: "Konversi Aset",
    desc: "Konversi zakat berupa barang (beras, dll.) menjadi nilai rupiah.",
  },
  {
    icon: Package,
    title: "Program Distribusi",
    desc: "Buat program dan distribusikan zakat langsung kepada mustahik.",
  },
  {
    icon: BarChart3,
    title: "Laporan & Monitoring",
    desc: "Pantau saldo, riwayat distribusi, dan statistik program.",
  },
];

const STEPS = [
  "Daftar akun dan buat profil masjid",
  "Tambahkan staf manager dan distributor",
  "Catat penerimaan zakat dari muzakki",
  "Distribusikan zakat ke mustahik melalui program",
];

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  const loggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <p className="text-base font-bold text-green-800 tracking-tight">SIM Zakat</p>
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <Link
                href="/admin/dashboard"
                className="text-sm bg-green-700 text-white px-4 py-1.5 rounded-lg hover:bg-green-800 transition-colors font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-green-800 font-medium transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-green-700 text-white px-4 py-1.5 rounded-lg hover:bg-green-800 transition-colors font-medium"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-green-300 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide">
            Sistem Informasi Manajemen Zakat
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Kelola Zakat Masjid<br />
            <span className="text-green-200">Lebih Mudah &amp; Transparan</span>
          </h1>
          <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Platform digital terintegrasi untuk penerimaan, pengelolaan, dan distribusi zakat masjid secara akuntabel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition shadow-lg"
            >
              Mulai Sekarang <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Masuk ke Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Fitur Lengkap untuk Amil Masjid</h2>
          <p className="text-gray-500 mt-2 text-sm">Semua yang Anda butuhkan dalam satu platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-green-200 transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition">
                <Icon className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="bg-green-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Mulai dalam 4 Langkah Mudah</h2>
          </div>
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-green-100">
                <div className="w-8 h-8 rounded-full bg-green-700 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 font-medium">{step}</p>
                <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto shrink-0" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-green-700 text-white font-bold px-7 py-3 rounded-xl hover:bg-green-800 transition shadow"
            >
              Daftar Sekarang — Gratis <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        <p className="font-semibold text-green-800 mb-1">SIM Zakat</p>
        <p>© 2026 Sistem Informasi Manajemen Zakat. Semua hak dilindungi.</p>
      </footer>
    </div>
  );
}
