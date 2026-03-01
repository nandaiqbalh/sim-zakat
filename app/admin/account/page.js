// app/admin/account/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { findUserById } from "@/lib/repositories/user.repository";
import AccountPageClient from "@/components/admin/AccountPageClient";

export const metadata = {
  title: "Akun Saya — SIM Zakat",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userRes = await findUserById(session.user.id);
  const user = userRes.success ? userRes.data : null;

  return (
    <AccountPageClient
      initialUser={{
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
      }}
    />
  );
}
