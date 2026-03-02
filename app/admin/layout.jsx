// app/admin/layout.jsx
//
// Layout only awaits getSession() (fast — JWT decode / cached).
// The slow findMosqueUserByUserId DB call lives in AdminNavLoader,
// wrapped in <Suspense>, so the shell + page skeleton stream to the
// browser immediately and the nav fills in as soon as the DB responds.

import { Suspense } from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { dmSans } from "@/lib/fonts";
import AdminNavLoader from "@/components/admin/AdminNavLoader";
import { NavSkeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Admin — SIM Zakat",
};

export default async function AdminLayout({ children }) {
  const session = await getSession();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className={dmSans.className}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-50">
        {/* Nav streams in independently — never blocks the page skeleton */}
        <Suspense fallback={<NavSkeleton />}>
          <AdminNavLoader />
        </Suspense>

        {/* children is wrapped in Suspense by each route's loading.jsx */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

