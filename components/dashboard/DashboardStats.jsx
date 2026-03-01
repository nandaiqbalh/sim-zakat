// components/dashboard/DashboardStats.jsx
import ZakatStat from "@/components/zakat/ZakatStat";
import {
  Wallet,
  Wheat,
  Users,
  UserCheck,
  ClipboardList,
  Clock,
  CheckCheck,
  TrendingUp,
} from "lucide-react";

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function fmtKg(n) {
  return `${(Number(n) || 0).toFixed(2)} kg`;
}

export default function DashboardStats({ stats }) {
  if (!stats) {
    return (
      <div className="text-center py-12 text-gray-400">
        Statistik tidak dapat dimuat. Silakan daftarkan masjid Anda terlebih dahulu.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Saldo */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Saldo Saat Ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ZakatStat label="Saldo Uang"   value={fmt(stats.cashBalance)}   icon={Wallet}  color="green" />
          <ZakatStat label="Saldo Beras"   value={fmtKg(stats.riceBalance)} icon={Wheat}   color="amber" />
          <ZakatStat label="Total Uang Masuk"  value={fmt(stats.cashIn)}        icon={TrendingUp} color="blue" />
          <ZakatStat label="Total Beras Masuk"  value={fmtKg(stats.riceIn)}      icon={Wheat}   color="teal" />
        </div>
      </div>

      {/* Distribusi */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Distribusi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ZakatStat label="Menunggu"        value={stats.pendingDistributions}    icon={Clock}       color="amber"  />
          <ZakatStat label="Selesai"      value={stats.completedDistributions}  icon={CheckCheck}  color="green"  />
          <ZakatStat label="Uang Didistribusikan" value={fmt(stats.cashOut)}          icon={Wallet}      color="purple" />
          <ZakatStat label="Beras Didistribusikan" value={fmtKg(stats.riceOut)}        icon={Wheat}       color="red"    />
        </div>
      </div>

      {/* Komunitas */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Komunitas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ZakatStat label="Muzakki"      value={stats.totalMuzakki}      icon={Users}       color="blue"  />
          <ZakatStat label="Mustahik Aktif"        value={stats.totalMustahik}     icon={UserCheck}   color="green" />
          <ZakatStat label="Total Transaksi"     value={stats.totalTransactions} icon={ClipboardList} color="purple" />
          <ZakatStat label="Uang Dikonversi→Beras"    value={fmt(stats.cashConverted)} icon={TrendingUp}  color="teal"  />
        </div>
      </div>
    </div>
  );
}
