// components/zakat/ZakatBadge.jsx

const variants = {
  green:  "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  red:    "bg-red-100 text-red-800",
  gray:   "bg-gray-100 text-gray-600",
  blue:   "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  amber:  "bg-amber-100 text-amber-800",
};

const CATEGORY_VARIANT = {
  FAKIR:       "amber",
  MISKIN:      "yellow",
  AMIL:        "blue",
  MUALAF:      "purple",
  GHARIM:      "red",
  FISABILILLAH:"green",
  IBNU_SABIL:  "gray",
};

const CATEGORY_LABEL = {
  FAKIR:       "Fakir",
  MISKIN:      "Miskin",
  AMIL:        "Amil",
  MUALAF:      "Mualaf",
  GHARIM:      "Gharim",
  FISABILILLAH:"Fisabilillah",
  IBNU_SABIL:  "Ibnu Sabil",
};

/**
 * Small status/category badge.
 * Pass `category` for auto-coloring mustahik categories,
 * or pass `label` + `variant` for custom use.
 */
export default function ZakatBadge({ label, variant = "green", category }) {
  const resolvedVariant = category ? (CATEGORY_VARIANT[category] ?? "gray") : variant;
  const resolvedLabel   = category ? (CATEGORY_LABEL[category] ?? category) : label;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        variants[resolvedVariant] ?? variants.green
      }`}
    >
      {resolvedLabel}
    </span>
  );
}
