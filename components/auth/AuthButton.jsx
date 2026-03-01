
export default function AuthButton({ children, loading = false, type = "submit", onClick, variant = "primary" }) {
  const base = "w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-green-700 text-white hover:bg-green-800",
    outline: "border border-green-700 text-green-700 hover:bg-green-50",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  const style = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${base} ${style} cursor-pointer`}
    >
      {loading ? (
        <span className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin cursor-not-allowed" />
      ) : (
        children
      )}
    </button>
  );
}