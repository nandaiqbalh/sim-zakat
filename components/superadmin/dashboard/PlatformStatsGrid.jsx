// components/superadmin/dashboard/PlatformStatsGrid.jsx
import { Building2, Users, Package, CheckCircle2, Banknote, Wheat } from "lucide-react";
import ZakatStat from "@/components/zakat/ZakatStat";

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n ?? 0);

/**
 * Grid of 8 platform-wide stat cards.
 * @param {{ summary: import('@/lib/repositories/superadmin.repository').PlatformSummary }} props
 */
export default function PlatformStatsGrid({ summary = {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <ZakatStat label="Total Masjid"        value={summary.totalMosques ?? 0}   icon={Building2}    color="purple" sub="Terdaftar di platform" />
      <ZakatStat label="Total Pengguna"       value={summary.totalUsers ?? 0}     icon={Users}        color="blue"   sub="Semua akun" />
      <ZakatStat label="Total Mustahik"       value={summary.totalMustahik ?? 0}  icon={Users}        color="green"  sub="Penerima zakat" />
      <ZakatStat label="Total Muzakki"        value={summary.totalMuzakki ?? 0}   icon={Users}        color="teal"   sub="Pembayar zakat" />
      <ZakatStat label="Program Distribusi"   value={summary.totalPrograms ?? 0}  icon={Package}      color="amber"  sub="Semua masjid" />
      <ZakatStat label="Item Terdistribusi"   value={summary.totalDistributed ?? 0} icon={CheckCircle2} color="green" sub="Status DISTRIBUTED" />
      <ZakatStat label="Total Uang Masuk"     value={fmt(summary.totalCash ?? 0)} icon={Banknote}     color="green"  sub="Seluruh masjid" />
      <ZakatStat label="Total Beras Masuk"    value={`${(summary.totalRice ?? 0).toLocaleString("id-ID")} kg`} icon={Wheat} color="amber" sub="Seluruh masjid" />
    </div>
  );
}
