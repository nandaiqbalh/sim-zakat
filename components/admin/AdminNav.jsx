// components/admin/AdminNav.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  ArrowDownToLine,
  Users,
  RefreshCcw,
  Package,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";

const MANAGER_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { divider: true },
  { href: "/admin/mosque", label: "Masjid", icon: Building2 },
  { href: "/admin/transactions", label: "Transaksi Masuk", icon: ArrowDownToLine },
  { href: "/admin/mustahik", label: "Data Mustahik", icon: Users },
  { href: "/admin/conversions", label: "Konversi Aset", icon: RefreshCcw },
  { href: "/admin/programs", label: "Program Distribusi", icon: Package },
];

const DISTRIBUTOR_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { divider: true },
  { href: "/admin/programs", label: "Program Distribusi", icon: Package },
];

const DEFAULT_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { divider: true },
  { href: "/admin/mosque", label: "Setup Masjid", icon: Building2 },
];

function getNavItems(mosqueRole) {
  if (mosqueRole === "MANAGER") return MANAGER_NAV;
  if (mosqueRole === "DISTRIBUTOR") return DISTRIBUTOR_NAV;
  return DEFAULT_NAV;
}

function getRoleLabel(mosqueRole) {
  if (mosqueRole === "MANAGER") return "Manager";
  if (mosqueRole === "DISTRIBUTOR") return "Distributor";
  return "Admin";
}

function SidebarContent({ onClose, mosqueRole, userName }) {
  const pathname = usePathname();
  const navItems = getNavItems(mosqueRole);

  const linkCls = (href) => {
    const isActive = pathname === href || pathname?.startsWith(href + "/");
    return [
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
      isActive
        ? "bg-green-700 text-white"
        : "text-gray-600 hover:bg-green-50 hover:text-green-800",
    ].join(" ");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
        <div>
          <p className="text-base font-bold text-green-800">SIM Zakat</p>
          <p className="text-xs text-gray-400">{getRoleLabel(mosqueRole)}</p>
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
        {navItems.map((item, i) =>
          item.divider ? (
            <div key={i} className="my-2 border-t border-gray-100" />
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={linkCls(item.href)}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
        <Link
          href="/admin/account"
          onClick={onClose}
          className={linkCls("/admin/account")}
        >
          <UserCircle className="w-4 h-4 shrink-0" />
          {userName ? userName.split(" ")[0] : "Akun Saya"}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Keluar
        </button>
        <p className="text-xs text-gray-400 px-3 pt-2">© 2026 SIM Zakat</p>
      </div>
    </div>
  );
}

export default function AdminNav({ mosqueRole = null, userName = "" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems(mosqueRole);

  const activeItem = navItems.find(
    (i) => !i.divider && (pathname === i.href || pathname?.startsWith(i.href + "/"))
  );

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
          {activeItem?.label ?? "SIM Zakat"}
        </span>
        <div className="w-9" />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-56 shrink-0 min-h-screen border-r border-gray-200 bg-white sticky top-0 self-start">
        <SidebarContent mosqueRole={mosqueRole} userName={userName} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl">
            <SidebarContent
              onClose={() => setMobileOpen(false)}
              mosqueRole={mosqueRole}
              userName={userName}
            />
          </div>
        </>
      )}
    </>
  );
}
