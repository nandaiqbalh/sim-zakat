// components/superadmin/shared/SuperAdminPagination.jsx
import Link from "next/link";

/**
 * Generic pagination for superadmin list pages.
 * @param {{ page: number, totalPages: number, total: number, itemLabel: string, buildHref: (page: number) => string }} props
 */
export default function SuperAdminPagination({ page, totalPages, total, itemLabel = "data", buildHref }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-400">
        Halaman {page} dari {totalPages} ({total} {itemLabel})
      </p>
      <div className="flex gap-2">
        {page > 1 && (
          <Link
            href={buildHref(page - 1)}
            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Sebelumnya
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={buildHref(page + 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Selanjutnya →
          </Link>
        )}
      </div>
    </div>
  );
}
