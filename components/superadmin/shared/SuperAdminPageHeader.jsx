// components/superadmin/shared/SuperAdminPageHeader.jsx

/**
 * Consistent page header for all superadmin pages.
 * @param {{ title: string, description?: string }} props
 */
export default function SuperAdminPageHeader({ title, description }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-1">
        Super Admin
      </p>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}
