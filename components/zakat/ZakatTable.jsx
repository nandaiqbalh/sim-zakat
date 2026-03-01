// components/zakat/ZakatTable.jsx

/**
 * Table with a green header row.
 * @param {{ headers: string[], children: React.ReactNode, className?: string }} props
 */
export default function ZakatTable({ headers, children, className = "", emptyMessage }) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-200 ${className}`}>
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-green-700">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
}

/**
 * A single table row, alternating bg.
 */
export function ZakatTr({ children, className = "" }) {
  return (
    <tr className={`hover:bg-green-50 transition-colors ${className}`}>{children}</tr>
  );
}

/**
 * Standard table data cell.
 */
export function ZakatTd({ children, className = "" }) {
  return (
    <td className={`px-4 py-3 text-sm text-gray-700 ${className}`}>{children}</td>
  );
}
