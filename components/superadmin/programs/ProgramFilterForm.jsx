// components/superadmin/programs/ProgramFilterForm.jsx
import Link from "next/link";

/**
 * Filter-by-mosque dropdown form for the programs page.
 * @param {{ mosques: Array<{ id: string, name: string }>, mosqueId: string, action?: string }} props
 */
export default function ProgramFilterForm({
  mosques = [],
  mosqueId = "",
  action = "/superadmin/programs",
}) {
  return (
    <form method="GET" action={action} className="flex gap-2 flex-wrap">
      <select
        name="mosqueId"
        defaultValue={mosqueId}
        className="text-sm rounded-xl border border-gray-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-w-[200px]"
      >
        <option value="">Semua Masjid</option>
        {mosques.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="px-4 py-2 text-sm rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
      >
        Filter
      </button>
      {mosqueId && (
        <Link
          href={action}
          className="px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Reset
        </Link>
      )}
    </form>
  );
}
