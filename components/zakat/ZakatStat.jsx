// components/zakat/ZakatStat.jsx

const iconColors = {
  green:  "bg-green-50 text-green-700",
  blue:   "bg-blue-50 text-blue-700",
  amber:  "bg-amber-50 text-amber-700",
  red:    "bg-red-50 text-red-700",
  purple: "bg-purple-50 text-purple-700",
  teal:   "bg-teal-50 text-teal-700",
};

/**
 * Stat card: icon + label + big value + optional sub-text.
 * @param {{ label: string, value: string|number, sub?: string, icon?: React.ComponentType, color?: keyof iconColors }} props
 */
export default function ZakatStat({ label, value, sub, icon: Icon, color = "green" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
      {Icon && (
        <div className={`p-2.5 rounded-lg shrink-0 ${iconColors[color] ?? iconColors.green}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5 truncate">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
