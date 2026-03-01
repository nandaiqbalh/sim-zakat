// components/transactions/BalanceCards.jsx
import ZakatStat from "@/components/zakat/ZakatStat";
import { Wallet, Wheat, ArrowDownLeft, ArrowUpRight } from "lucide-react";

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function fmtKg(n) {
  return `${(Number(n) || 0).toFixed(2)} kg`;
}

export default function BalanceCards({ balance }) {
  if (!balance) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <ZakatStat
        label="Saldo Uang"
        value={fmt(balance.cashBalance)}
        sub={`Masuk: ${fmt(balance.cashIn)}`}
        icon={Wallet}
        color="green"
      />
      <ZakatStat
        label="Saldo Beras"
        value={fmtKg(balance.riceBalance)}
        sub={`Masuk: ${fmtKg(balance.riceIn)}`}
        icon={Wheat}
        color="amber"
      />
      <ZakatStat
        label="Uang Didistribusikan"
        value={fmt(balance.cashOut)}
        sub={`Konversi: ${fmt(balance.cashConverted)}`}
        icon={ArrowUpRight}
        color="blue"
      />
      <ZakatStat
        label="Beras Didistribusikan"
        value={fmtKg(balance.riceOut)}
        sub={`Dari konversi: ${fmtKg(balance.riceFromConversion)}`}
        icon={ArrowDownLeft}
        color="purple"
      />
    </div>
  );
}
