// app/superadmin/users/page.jsx
import { getUserList } from "@/lib/services/superadmin.service";
import SuperAdminPageHeader from "@/components/superadmin/shared/SuperAdminPageHeader";
import SuperAdminPagination from "@/components/superadmin/shared/SuperAdminPagination";
import UserSearchForm from "@/components/superadmin/users/UserSearchForm";
import UserTable from "@/components/superadmin/users/UserTable";

export const metadata = { title: "Pengguna — Super Admin SIM Zakat" };

const LIMIT = 20;

export default async function SuperAdminUsersPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page ?? 1));
  const search = sp?.search ?? "";

  const res = await getUserList({ page, limit: LIMIT, search });
  const { users = [], total = 0 } = res.data ?? {};
  const totalPages = Math.ceil(total / LIMIT);

  const buildHref = (p) => {
    const params = new URLSearchParams();
    if (p > 1) params.set("page", String(p));
    if (search) params.set("search", search);
    return `/superadmin/users${params.toString() ? `?${params}` : ""}`;
  };

  return (
    <div className="space-y-6">
      <SuperAdminPageHeader
        title="Pengguna"
        description={`${total} pengguna terdaftar di platform.`}
      />

      <UserSearchForm search={search} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <UserTable users={users} />
      </div>

      <SuperAdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        itemLabel="pengguna"
        buildHref={buildHref}
      />
    </div>
  );
}
