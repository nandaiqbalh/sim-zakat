"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Heart, Calculator, BookOpen, Wheat } from "lucide-react";

export default function Header({ className = "" }) {
  const { data: session } = useSession();
  const accountHref = session ? "/account" : "/login";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 ${className}`}>
      <div className="max-w-screen-xl mx-auto flex items-center h-14 px-4 gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center">
            <Wheat className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-green-800 tracking-tight">SIM Zakat</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-0.5 ml-2">
          <Link
            href="/calculator/zakat-fitrah"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" /> Kalkulator
          </Link>
          <Link
            href="/doa"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <Heart className="w-3.5 h-3.5" /> Doa &amp; Niat
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" /> Panduan
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Mobile: Doa & Niat */}
          <Link
            href="/doa"
            className="sm:hidden flex items-center gap-1 text-sm text-gray-500 hover:text-green-700 transition px-2 py-1.5 rounded-lg hover:bg-green-50"
          >
            <Heart className="w-4 h-4" />
          </Link>
          <Link
            href={accountHref}
            className="text-sm text-gray-600 hover:text-green-800 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            {session ? "Akun" : "Masuk"}
          </Link>
        </div>
      </div>
    </header>
  );
}


