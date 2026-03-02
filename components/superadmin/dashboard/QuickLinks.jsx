// components/superadmin/dashboard/QuickLinks.jsx
import Link from "next/link";
import { Building2, ArrowDownToLine, Package, Users } from "lucide-react";

const LINKS = [
  { href: "/superadmin/mosques",      label: "Daftar Masjid",       icon: Building2,       cls: "bg-purple-50 text-purple-700 border-purple-100" },
  { href: "/superadmin/transactions", label: "Ringkasan Transaksi",  icon: ArrowDownToLine, cls: "bg-green-50 text-green-700 border-green-100" },
  { href: "/superadmin/programs",     label: "Program Distribusi",   icon: Package,         cls: "bg-amber-50 text-amber-700 border-amber-100" },
  { href: "/superadmin/users",        label: "Pengguna",             icon: Users,           cls: "bg-blue-50 text-blue-700 border-blue-100" },
];

/** Static quick-navigation tiles at the bottom of the dashboard. */
export default function QuickLinks() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center hover:shadow-sm transition-all ${item.cls}`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-xs font-semibold">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
