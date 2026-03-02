// app/calculator/fidyah/page.jsx
import FidyahCalculator from "@/components/calculator/FidyahCalculator";

export const metadata = {
  title: "Kalkulator Fidyah — SIM Zakat",
  description: "Hitung kewajiban fidyah berdasarkan jumlah hari dan ketentuan Kemenag RI.",
};

export default function FidyahPage() {
  return <FidyahCalculator />;
}
