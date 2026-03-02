// app/calculator/layout.jsx
import Link from "next/link";
import { dmSans } from "@/lib/fonts";
import { Calculator, BookOpen, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Kalkulator Zakat — SIM Zakat",
  description: "Hitung zakat fitrah dan fidyah dengan mudah sesuai ketentuan Kemenag.",
};

export default function CalculatorLayout({ children }) {
  return (
    <div className={`${dmSans.className} min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50`}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-green-700" />
              <span className="text-sm font-semibold text-green-800">Kalkulator Zakat</span>
            </div>
          </div>

          {/* Tab navigation */}
          <nav className="flex items-center gap-1">
            <Link
              href="/calculator/zakat-fitrah"
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium text-gray-600 hover:text-green-800 hover:bg-green-50 transition-colors"
            >
              Zakat Fitrah
            </Link>
            <Link
              href="/calculator/fidyah"
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium text-gray-600 hover:text-green-800 hover:bg-green-50 transition-colors"
            >
              Fidyah
            </Link>
            <Link
              href="/docs"
              className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium text-gray-600 hover:text-green-800 hover:bg-green-50 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Panduan
            </Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">{children}</main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100 bg-white/60">
        © 2026 SIM Zakat · Perhitungan berdasarkan ketentuan Kemenag RI
      </footer>
    </div>
  );
}
