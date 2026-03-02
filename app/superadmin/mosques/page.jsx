// app/superadmin/mosques/page.jsx
import { getMosqueList } from "@/lib/services/superadmin.service";
import SuperAdminPageHeader from "@/components/superadmin/shared/SuperAdminPageHeader";
import SuperAdminPagination from "@/components/superadmin/shared/SuperAdminPagination";
import MosqueSearchForm from "@/components/superadmin/mosques/MosqueSearchForm";
import MosqueTable from "@/components/superadmin/mosques/MosqueTable";

export const metadata = { title: "Daftar Masjid — Super Admin SIM Zakat" };

const LIMIT = 15;

export default async function SuperAdminMosquesPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page ?? 1));
  const search = sp?.search ?? "";

  const res = await getMosqueList({ page, limit: LIMIT, search });
  const { mosques = [], total = 0 } = res.data ?? {};
  const totalPages = Math.ceil(total / LIMIT);

  const buildHref = (p) => {
    const params = new URLSearchParams();
    if (p > 1) params.set("page", String(p));
    if (search) params.set("search", search);
    return `/superadmin/mosques${params.toString() ? `?${params}` : ""}`;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <SuperAdminPageHeader
        title="Daftar Masjid"
        description={`${total} masjid terdaftar di platform.`}
      />

      <MosqueSearchForm search={search} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <MosqueTable mosques={mosques} />
      </div>

      <SuperAdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        itemLabel="masjid"
        buildHref={buildHref}
      />
    </div>
  );
}
