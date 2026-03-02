// app/superadmin/dashboard/page.jsx
import { getDashboardOverview } from "@/lib/services/superadmin.service";
import SuperAdminPageHeader from "@/components/superadmin/shared/SuperAdminPageHeader";
import PlatformStatsGrid from "@/components/superadmin/dashboard/PlatformStatsGrid";
import TopMosquesCard from "@/components/superadmin/dashboard/TopMosquesCard";
import RecentActivityCard from "@/components/superadmin/dashboard/RecentActivityCard";
import QuickLinks from "@/components/superadmin/dashboard/QuickLinks";

export const metadata = { title: "Dashboard — Super Admin SIM Zakat" };

export default async function SuperAdminDashboardPage() {
  const res = await getDashboardOverview();
  const { summary = {}, recentActivity = [], topMosques = [] } = res.data ?? {};

  return (
    <div className="space-y-8 max-w-6xl">
      <SuperAdminPageHeader
        title="Dashboard Monitoring"
        description="Ringkasan platform SIM Zakat secara keseluruhan."
      />

      <PlatformStatsGrid summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopMosquesCard mosques={topMosques} />
        <RecentActivityCard transactions={recentActivity} />
      </div>

      <QuickLinks />
    </div>
  );
}
