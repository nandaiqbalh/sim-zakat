"use client";
// components/superadmin/SuperAdminNav.jsx

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu, X, LayoutDashboard, Building2, ArrowDownToLine,
  Package, Users, LogOut, ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/superadmin/dashboard",    label: "Dashboard",          icon: LayoutDashboard },
  { divider: true },
  { href: "/superadmin/mosques",      label: "Daftar Masjid",      icon: Building2 },
  { href: "/superadmin/transactions", label: "Ringkasan Transaksi", icon: ArrowDownToLine },
  { href: "/superadmin/programs",     label: "Program Distribusi", icon: Package },
  { href: "/superadmin/users",        label: "Pengguna",           icon: Users },
];

function SidebarContent({ onClose }) {
  const pathname = usePathname();

  const linkCls = (href) => {
    const isActive = pathname === href || pathname?.startsWith(href + "/");
    return [
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
      isActive ? "bg-indigo-700 text-white" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-800",
    ].join(" ");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-indigo-800">SIM Zakat</p>
            <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wide">Super Admin</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item, i) =>
          item.divider ? (
            <div key={i} className="my-2 border-t border-gray-100" />
          ) : (
            <Link key={item.href} href={item.href} onClick={onClose} className={linkCls(item.href)}>
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-1">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Keluar
        </button>
        <p className="text-xs text-gray-400 px-3 pt-2">© 2026 SIM Zakat</p>
      </div>
    </div>
  );
}

export default function SuperAdminNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeItem = NAV_ITEMS.find(
    (i) => !i.divider && (pathname === i.href || pathname?.startsWith(i.href + "/"))
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold text-indigo-800">{activeItem?.label ?? "Super Admin"}</span>
        <div className="w-9" />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-56 shrink-0 min-h-screen border-r border-gray-200 bg-white sticky top-0 self-start">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl">
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
