// components/superadmin/mosques/MosqueSearchForm.jsx
import Link from "next/link";
import { Search } from "lucide-react";

/**
 * GET search form for the mosque list page.
 * @param {{ search: string, action?: string }} props
 */
export default function MosqueSearchForm({ search = "", action = "/superadmin/mosques" }) {
  return (
    <form method="GET" action={action} className="flex gap-2 flex-wrap">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          name="search"
          defaultValue={search}
          placeholder="Cari nama masjid…"
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
      >
        Cari
      </button>
      {search && (
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
