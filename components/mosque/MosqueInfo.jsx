// components/mosque/MosqueInfo.jsx
import ZakatCard from "@/components/zakat/ZakatCard";
import { Building2, MapPin, CalendarDays } from "lucide-react";

export default function MosqueInfo({ mosque }) {
  const createdAt = new Date(mosque.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ZakatCard accent className="mb-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-100 rounded-xl shrink-0">
          <Building2 className="w-6 h-6 text-green-700" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900">{mosque.name}</h2>
          {mosque.address && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {mosque.address}
            </p>
          )}
          <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            Terdaftar sejak {createdAt}
          </p>
        </div>
      </div>
    </ZakatCard>
  );
}
