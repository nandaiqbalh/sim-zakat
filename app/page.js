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
  Calculator,
  BookOpen,
  Github,
  Wheat,
  Banknote,
  CalendarClock,
  ShieldCheck,
  Heart,
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
    color: "bg-green-50 text-green-700",
  },
  {
    icon: ArrowDownToLine,
    title: "Penerimaan Zakat",
    desc: "Catat transaksi zakat fitrah, maal, dan infaq secara terstruktur.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: Users,
    title: "Data Mustahik",
    desc: "Kelola data penerima zakat (mustahik) dengan kategori 8 asnaf.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: RefreshCcw,
    title: "Konversi Aset",
    desc: "Konversi zakat berupa beras menjadi nilai rupiah secara akurat.",
    color: "bg-orange-50 text-orange-700",
  },
  {
    icon: Package,
    title: "Program Distribusi",
    desc: "Buat program dan distribusikan zakat langsung kepada mustahik.",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: BarChart3,
    title: "Laporan & Monitoring",
    desc: "Pantau saldo, riwayat distribusi, dan statistik program secara real-time.",
    color: "bg-rose-50 text-rose-700",
  },
];

const STEPS = [
  { label: "Daftar akun dan setup profil masjid", sub: "Gratis, tanpa biaya apapun" },
  { label: "Tambahkan staf manager dan distributor", sub: "Kontrol akses berbasis peran" },
  { label: "Catat penerimaan zakat dari muzakki", sub: "Uang tunai, beras, atau aset lain" },
  { label: "Distribusikan zakat ke mustahik", sub: "Melalui program distribusi terstruktur" },
];

const STATS = [
  { value: "8", label: "Kategori Asnaf", icon: Users },
  { value: "2", label: "Jenis Aset Zakat", icon: Banknote },
  { value: "100%", label: "Open Source", icon: Github },
  { value: "Free", label: "Gratis Selamanya", icon: ShieldCheck },
];

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  const loggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center">
              <Wheat className="w-4 h-4 text-white" />
            </div>
            <p className="text-base font-bold text-green-800 tracking-tight">SIM Zakat</p>
          </div>

          <nav className="hidden md:flex items-center gap-0.5">
            <Link href="/calculator/zakat-fitrah"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <Calculator className="w-3.5 h-3.5" /> Kalkulator
            </Link>
            <Link href="/doa"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <Heart className="w-3.5 h-3.5" /> Doa &amp; Niat
            </Link>
            <Link href="/docs"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <BookOpen className="w-3.5 h-3.5" /> Panduan
            </Link>
            <Link href="https://github.com/nandaiqbalh/sim-zakat" target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <Github className="w-3.5 h-3.5" /> GitHub
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {loggedIn ? (
              <Link href="/admin/dashboard"
                className="text-sm bg-green-700 text-white px-4 py-1.5 rounded-lg hover:bg-green-800 transition-colors font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                  <Link href="/login"
                    className="text-sm text-gray-600 hover:text-green-800 font-medium transition-colors px-3 py-1.5">
                  Masuk
                </Link>
                  <Link href="/register"
                    className="text-sm bg-green-700 text-white px-4 py-1.5 rounded-lg hover:bg-green-800 transition-colors font-semibold">
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 text-white">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-green-300/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Open Source · Gratis Selamanya
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] mb-5 tracking-tight">
              Kelola Zakat Masjid<br />
              <span className="text-green-200">Lebih Mudah &</span>{" "}
              <span className="text-emerald-300">Transparan</span>
            </h1>
            <p className="text-green-100 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Platform digital terintegrasi untuk penerimaan, pengelolaan, dan distribusi zakat
              masjid secara akuntabel. Dari muzakki hingga mustahik — semua tercatat.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link href={loggedIn ? "/admin/dashboard" : "/register"}
                className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold px-7 py-3 rounded-xl hover:bg-green-50 transition shadow-xl text-sm sm:text-base">
                {loggedIn ? "Buka Dashboard" : "Mulai Gratis"} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/docs"
                className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 text-white font-medium px-7 py-3 rounded-xl hover:bg-white/20 transition text-sm sm:text-base">
                <BookOpen className="w-4 h-4" /> Lihat Panduan
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-green-200">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tidak perlu kartu kredit</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center text-center py-3">
                <Icon className="w-5 h-5 text-green-600 mb-1.5" />
                <p className="text-2xl font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Fitur Unggulan</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Semua yang Amil Butuhkan</h2>
          <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
            Dari pencatatan hingga distribusi — dikelola dalam satu platform yang mudah digunakan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title}
              className="relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gray-50 -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-300" />
              <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="relative text-sm font-bold text-gray-900 mb-1.5">{title}</h3>
              <p className="relative text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calculator CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Calculator className="w-3.5 h-3.5" /> Fitur Gratis untuk Muzakki
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Kalkulator Zakat Fitrah & Fidyah
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg">
                Hitung kewajiban zakat fitrah untuk seluruh anggota keluarga atau fidyah
                pengganti puasa — sesuai ketentuan Kemenag RI. Tidak perlu login.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/calculator/zakat-fitrah"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm shadow">
                  🌾 Kalkulator Zakat Fitrah
                </Link>
                <Link href="/calculator/fidyah"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-amber-200 hover:border-amber-400 text-amber-700 font-semibold px-5 py-2.5 rounded-xl transition text-sm">
                  📅 Kalkulator Fidyah
                </Link>
                <Link href="/doa"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-green-200 hover:border-green-400 text-green-700 font-semibold px-5 py-2.5 rounded-xl transition text-sm">
                  🤲 Doa &amp; Niat
                </Link>
              </div>
            </div>
            {/* Visual decoration */}
            <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0">
              {[
                { emoji: "🌾", label: "Zakat Fitrah", sub: "2,5 kg / jiwa" },
                { emoji: "📅", label: "Fidyah", sub: "per hari / orang" },
                { emoji: "💵", label: "Bayar Uang", sub: "sesuai harga pasar" },
                { emoji: "📊", label: "Real-time", sub: "hasil langsung" },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-xl p-4 border border-amber-100 text-center w-28">
                  <p className="text-2xl mb-1">{c.emoji}</p>
                  <p className="text-xs font-semibold text-gray-700">{c.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Doa & Niat CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border border-green-100 rounded-3xl p-7 sm:p-9 flex flex-col sm:flex-row items-center gap-6">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-600 flex items-center justify-center text-3xl shadow-lg">
            🤲
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              <Heart className="w-3.5 h-3.5" /> Referensi Ibadah
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Niat &amp; Doa Zakat</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Lafal niat zakat fitrah untuk diri sendiri, istri, anak, dan keluarga — lengkap dengan teks Arab, latin, dan terjemahan. Plus doa penerima zakat dan niat fidyah.
            </p>
          </div>
          <Link
            href="/doa"
            className="shrink-0 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition text-sm shadow-lg"
          >
            Buka Doa &amp; Niat <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Cara Mulai</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Siap dalam 4 Langkah</h2>
          </div>
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i}
                className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-green-100 hover:border-green-300 hover:shadow-md transition-all group">
                <div className="w-9 h-9 rounded-full bg-green-700 text-white text-sm font-bold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-semibold">{step.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.sub}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-green-700 text-white font-bold px-7 py-3 rounded-xl hover:bg-green-800 transition shadow-lg">
              Daftar Sekarang — Gratis <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Docs CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-10 overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-green-700/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-emerald-600/15 blur-3xl" />
          </div>
          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-white/10">
                <BookOpen className="w-3.5 h-3.5" /> Dokumentasi Lengkap
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Panduan Penggunaan</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">
                Panduan lengkap dari login, setup masjid, catat transaksi, hingga distribusi zakat ke
                mustahik. Dilengkapi panduan bagi Manager dan Distributor.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/docs"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm shadow">
                  <BookOpen className="w-4 h-4" /> Baca Panduan
                </Link>
                <Link href="https://github.com/nandaiqbalh/sim-zakat" target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm">
                  <Github className="w-4 h-4" /> Lihat di GitHub
                </Link>
              </div>
            </div>
            {/* Steps preview */}
            <div className="hidden lg:flex flex-col gap-2 shrink-0 w-52">
              {["Login & Daftar", "Setup Masjid & Staff", "Catat Transaksi", "Program Distribusi", "Kalkulator & Doa Zakat"].map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-xs text-gray-300">{s}</span>
                </div>
              ))}
              <p className="text-xs text-gray-500 text-center mt-1">dan 6 panduan lainnya →</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center">
                <Wheat className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-800">SIM Zakat</p>
                <p className="text-xs text-gray-400">Open Source</p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
              <Link href="/calculator/zakat-fitrah" className="flex items-center gap-1 hover:text-green-700 transition-colors">
                <Calculator className="w-3 h-3" /> Zakat Fitrah
              </Link>
              <Link href="/calculator/fidyah" className="flex items-center gap-1 hover:text-green-700 transition-colors">
                <CalendarClock className="w-3 h-3" /> Fidyah
              </Link>
              <Link href="/doa" className="flex items-center gap-1 hover:text-green-700 transition-colors">
                <Heart className="w-3 h-3" /> Doa &amp; Niat
              </Link>
              <Link href="/docs" className="flex items-center gap-1 hover:text-green-700 transition-colors">
                <BookOpen className="w-3 h-3" /> Panduan
              </Link>
              <Link href="https://github.com/nandaiqbalh/sim-zakat" target="_blank" className="flex items-center gap-1 hover:text-green-700 transition-colors">
                <Github className="w-3 h-3" /> GitHub
              </Link>
            </nav>
          </div>
          <div className="mt-6 pt-5 border-t border-gray-50 text-center text-xs text-gray-400">
            © 2026 Sistem Informasi Manajemen Zakat. Dibuat dengan ❤️ untuk masjid-masjid di Indonesia.
          </div>
        </div>
      </footer>

    </div>
  );
}
