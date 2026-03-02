// components/superadmin/users/UserTable.jsx
import { Users, Shield, Building2 } from "lucide-react";

const ROLE_LABELS = {
  SUPERADMIN: { label: "Super Admin", cls: "bg-indigo-100 text-indigo-700" },
  ADMIN:      { label: "Admin",       cls: "bg-green-100 text-green-700" },
  USER:       { label: "Pengguna",    cls: "bg-gray-100 text-gray-600" },
};

const MOSQUE_ROLE_LABELS = {
  ADMIN:   { label: "Admin",   cls: "bg-green-100 text-green-700" },
  STAFF:   { label: "Staf",    cls: "bg-blue-100 text-blue-700" },
  VIEWER:  { label: "Viewer",  cls: "bg-gray-100 text-gray-500" },
};

/**
 * Table of users with their system role and mosque assignments.
 * @param {{ users: Array }} props
 */
export default function UserTable({ users = [] }) {
  if (users.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-sm">Tidak ada pengguna ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-left">
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Pengguna</th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-center">
              Role Sistem
            </th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">
              Masjid &amp; Role
            </th>
            <th className="px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide text-right">
              Terdaftar
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((u) => {
            const roleInfo = ROLE_LABELS[u.role] ?? { label: u.role, cls: "bg-gray-100 text-gray-600" };
            const initial = (u.name ?? u.email ?? "?")[0].toUpperCase();

            return (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-700 font-bold text-sm">
                      {initial}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{u.name ?? "—"}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${roleInfo.cls}`}>
                    <Shield className="w-3 h-3" />
                    {roleInfo.label}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {!u.mosqueRoles?.length ? (
                    <span className="text-xs text-gray-400">—</span>
                  ) : (
                    <div className="space-y-1">
                      {u.mosqueRoles.map((mr, idx) => {
                        const mrInfo = MOSQUE_ROLE_LABELS[mr.role] ?? {
                          label: mr.role,
                          cls: "bg-gray-100 text-gray-600",
                        };
                        return (
                          <div key={idx} className="flex items-center gap-1.5">
                            <Building2 className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="text-xs text-gray-700 truncate max-w-[140px]">
                              {mr.mosque?.name ?? "—"}
                            </span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${mrInfo.cls}`}>
                              {mrInfo.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 text-right text-xs text-gray-400 whitespace-nowrap">
                  {new Date(u.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
