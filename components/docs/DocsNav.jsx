"use client";
// components/docs/DocsNav.jsx

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogIn,
  Building2,
  ArrowDownToLine,
  RefreshCcw,
  Users,
  Package,
  Truck,
  UserCircle,
  Calculator,
  Github,
  ChevronRight,
  BookOpen,
  Menu,
  X,
  Home,
} from "lucide-react";

import { DOC_SECTIONS } from "@/lib/docs";


function NavItem({ section, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === `/docs/${section.slug}`;
  const Icon = section.icon;

  return (
    <Link
      href={`/docs/${section.slug}`}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
        isActive
          ? "bg-green-700 text-white"
          : "text-gray-600 hover:bg-green-50 hover:text-green-800"
      }`}
    >
      <span
        className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
          isActive ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-700"
        }`}
      >
        {section.step}
      </span>
      <Icon className="w-4 h-4 shrink-0" />
      <span className="truncate">{section.label}</span>
    </Link>
  );
}

function SidebarContent({ onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-700" />
          <div>
            <p className="text-sm font-bold text-green-800">Panduan Penggunaan</p>
            <p className="text-xs text-gray-400">SIM Zakat</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-green-700 hover:bg-green-50 transition-colors mb-3"
        >
          <Home className="w-3.5 h-3.5" />
          Kembali ke Beranda
        </Link>
        <div className="my-2 border-t border-gray-100" />
        {DOC_SECTIONS.map((s) => (
          <NavItem key={s.slug} section={s} onClick={onClose} />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">© 2026 SIM Zakat</p>
      </div>
    </div>
  );
}

export default function DocsNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = DOC_SECTIONS.find((s) => pathname === `/docs/${s.slug}`);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
          aria-label="Buka navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-green-800">
          {activeSection ? `${activeSection.step}. ${activeSection.label}` : "Panduan SIM Zakat"}
        </span>
        <div className="w-9" />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 min-h-screen border-r border-gray-200 bg-white sticky top-0 self-start max-h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
