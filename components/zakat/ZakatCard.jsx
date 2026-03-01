// components/zakat/ZakatCard.jsx

/**
 * Base white card container with a subtle green accent border on the left.
 * Use `accent` prop to show/hide the left border.
 */
export default function ZakatCard({ children, className = "", accent = false }) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${
        accent ? "border-l-4 border-l-green-600" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
