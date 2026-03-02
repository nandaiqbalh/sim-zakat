// app/docs/page.jsx — redirect to first section
import { redirect } from "next/navigation";

export default function DocsIndexPage() {
  redirect("/docs/login-register");
}
