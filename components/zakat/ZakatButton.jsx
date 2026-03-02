// components/zakat/ZakatButton.jsx

const variantClasses = {
  primary:   "bg-green-700 hover:bg-green-800 active:bg-green-900 text-white border-transparent",
  secondary: "bg-white hover:bg-green-50 active:bg-green-100 text-green-700 border-green-300",
  danger:    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent",
  ghost:     "bg-transparent hover:bg-green-50 text-green-700 border-transparent",
  outline:   "bg-white hover:bg-gray-50 text-gray-700 border-gray-300",
};

const sizeClasses = {
  xs: "px-2.5 py-1 text-xs gap-1",
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
};

/**
 * Consistent button with green primary / white secondary.
 */
export default function ZakatButton({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled,
  loading,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg border
        transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant] ?? variantClasses.primary}
        ${sizeClasses[size] ?? sizeClasses.md}
        ${className}
      cursor-pointer`}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
