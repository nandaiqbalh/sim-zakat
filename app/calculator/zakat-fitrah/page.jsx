// app/calculator/zakat-fitrah/page.jsx
import ZakatFitrahCalculator from "@/components/calculator/ZakatFitrahCalculator";

export const metadata = {
  title: "Kalkulator Zakat Fitrah — SIM Zakat",
  description: "Hitung kewajiban zakat fitrah untuk diri dan keluarga berdasarkan ketentuan Kemenag RI.",
};

export default function ZakatFitrahPage() {
  return <ZakatFitrahCalculator />;
}
