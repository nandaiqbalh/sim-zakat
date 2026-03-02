// app/calculator/page.jsx — redirect to zakat-fitrah
import { redirect } from "next/navigation";

export default function CalculatorIndexPage() {
  redirect("/calculator/zakat-fitrah");
}
