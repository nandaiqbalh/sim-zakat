// app/admin/layout.jsx
//
// Root layout for all `/admin` routes.  This server component
// performs an authentication check (redirecting non-admin users
// to `/login`) and provides the global navigation via
// AdminNav.  Children are rendered in the main content area.

import { dmSans } from "@/lib/fonts";
import AdminNav from "@/components/admin/AdminNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { findMosqueUserByUserId } from "@/lib/repositories/mosque.repository";

export const metadata = {
  title: "Admin — SIM Zakat",
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!session || role !== "ADMIN") {
    redirect("/login");
  }

  // Fetch the current user's MosqueRole (MANAGER | DISTRIBUTOR | null)
  let mosqueRole = null;
  const mosqueUserRes = await findMosqueUserByUserId(session.user.id);
  if (mosqueUserRes.success && mosqueUserRes.data) {
    mosqueRole = mosqueUserRes.data.role;
  }

  return (
    <div className={dmSans.className}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-50">
        {/* navigation (sidebar + mobile) */}
        <AdminNav mosqueRole={mosqueRole} userName={session.user.name} />

        {/* main content area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
