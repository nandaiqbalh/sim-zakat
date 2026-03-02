// components/superadmin/mosques/MosqueTable.jsx
import { Building2 } from "lucide-react";

/**
 * Table displaying mosque list with counts.
 * @param {{ mosques: Array }} props
 */
export default function MosqueTable({ mosques = [] }) {
  if (mosques.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Tidak ada masjid ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-left">
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Masjid</th>
            <Th center>Staf</Th>
            <Th center>Mustahik</Th>
            <Th center>Muzakki</Th>
            <Th center>Transaksi</Th>
            <Th center>Program</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {mosques.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{m.name}</p>
                    {m.address && (
                      <p className="text-xs text-gray-400 truncate max-w-xs">{m.address}</p>
                    )}
                  </div>
                </div>
              </td>
              <CountCell>{m._count?.users ?? 0}</CountCell>
              <CountCell>{m._count?.mustahik ?? 0}</CountCell>
              <CountCell>{m._count?.muzakki ?? 0}</CountCell>
              <CountCell>{m._count?.zakatIn ?? 0}</CountCell>
              <CountCell>{m._count?.programs ?? 0}</CountCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, center }) {
  return (
    <th className={`px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide ${center ? "text-center" : ""}`}>
      {children}
    </th>
  );
}

function CountCell({ children }) {
  return (
    <td className="px-5 py-4 text-center">
      <span className="inline-block min-w-[2rem] px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
        {children}
      </span>
    </td>
  );
}
