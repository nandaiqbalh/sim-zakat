// app/superadmin/layout.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { dmSans } from "@/lib/fonts";
import SuperAdminNav from "@/components/superadmin/SuperAdminNav";

export const metadata = {
  title: "Super Admin — SIM Zakat",
};

export default async function SuperAdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "SUPERADMIN") {
    redirect("/login");
  }

  return (
    <div className={dmSans.className}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-50">
        <SuperAdminNav />
        <main className="flex-1 p-6 w-full">{children}</main>
      </div>
    </div>
  );
}
