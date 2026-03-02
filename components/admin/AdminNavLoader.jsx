// components/admin/AdminNavLoader.jsx
// Async server component — fetches mosqueRole from DB then renders AdminNav.
// Wrapped in <Suspense> by AdminLayout so it never blocks the layout shell.
import { getSession } from "@/lib/session";
import { findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";
import AdminNav from "./AdminNav";

export default async function AdminNavLoader() {
  const session = await getSession();
  let mosqueRole = null;
  if (session?.user?.id) {
    const res = await findMosqueUserByUserId(session.user.id);
    if (res.success && res.data) mosqueRole = res.data.role;
  }
  return (
    <AdminNav
      mosqueRole={mosqueRole}
      userName={session?.user?.name ?? ""}
    />
  );
}
