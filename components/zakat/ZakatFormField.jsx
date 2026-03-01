// components/zakat/ZakatFormField.jsx

/**
 * Form field wrapper: label + input slot + error message.
 */
export default function ZakatFormField({ label, error, children, required = false, className = "" }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/** Shared input className for consistent styling */
export const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 " +
  "disabled:bg-gray-50 disabled:cursor-not-allowed placeholder:text-gray-400";

/** Shared select className */
export const selectCls = inputCls;
