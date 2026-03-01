// components/zakat/ZakatEmptyState.jsx
import { Inbox } from "lucide-react";

/**
 * Friendly empty-state placeholder.
 */
export default function ZakatEmptyState({
  title = "No data yet",
  description = "",
  action,
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-green-50 rounded-full mb-4">
        <Icon className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-400 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
