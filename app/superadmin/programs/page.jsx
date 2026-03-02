// app/superadmin/programs/page.jsx
import { getProgramList } from "@/lib/services/superadmin.service";
import SuperAdminPageHeader from "@/components/superadmin/shared/SuperAdminPageHeader";
import SuperAdminPagination from "@/components/superadmin/shared/SuperAdminPagination";
import ProgramFilterForm from "@/components/superadmin/programs/ProgramFilterForm";
import ProgramTable from "@/components/superadmin/programs/ProgramTable";

export const metadata = { title: "Program Distribusi — Super Admin SIM Zakat" };

const LIMIT = 15;

export default async function SuperAdminProgramsPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page ?? 1));
  const mosqueId = sp?.mosqueId ?? "";

  const res = await getProgramList({ page, limit: LIMIT, mosqueId });
  const { programs = [], total = 0, allMosques = [] } = res.data ?? {};
  const totalPages = Math.ceil(total / LIMIT);

  const buildHref = (p) => {
    const params = new URLSearchParams();
    if (p > 1) params.set("page", String(p));
    if (mosqueId) params.set("mosqueId", mosqueId);
    return `/superadmin/programs${params.toString() ? `?${params}` : ""}`;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <SuperAdminPageHeader
        title="Program Distribusi"
        description={`${total} program terdaftar di seluruh masjid.`}
      />

      <ProgramFilterForm mosques={allMosques} mosqueId={mosqueId} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <ProgramTable programs={programs} />
      </div>

      <SuperAdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        itemLabel="program"
        buildHref={buildHref}
      />
    </div>
  );
}
