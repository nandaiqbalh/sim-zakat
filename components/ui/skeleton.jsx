// components/ui/skeleton.jsx
// Primitive shimmer building blocks + pre-built page skeletons for every route.

import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────
   Primitive
───────────────────────────────────────── */

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200/80",
        className
      )}
      {...props}
    />
  );
}

/* ─────────────────────────────────────────
   Small re-usable primitives
───────────────────────────────────────── */

/** Single stat card skeleton */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
      <Skeleton className="h-7 w-32" />
      <Skeleton className="h-2.5 w-20" />
    </div>
  );
}

/** Table row skeleton */
export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-3.5 w-full" style={{ opacity: 1 - i * 0.08 }} />
        </td>
      ))}
    </tr>
  );
}

/** Card list skeleton */
export function CardListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/** Page header skeleton */
export function PageHeaderSkeleton() {
  return (
    <div className="mb-6 space-y-2">
      <Skeleton className="h-7 w-52" />
      <Skeleton className="h-3.5 w-80" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Pre-built page skeletons
───────────────────────────────────────── */

/** Dashboard-style: stats grid + table */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      {/* stat grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      {/* second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      {/* recent activity card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
        <Skeleton className="h-5 w-40" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-2.5 w-1/3" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Table page: header + stat cards + table */
export function TablePageSkeleton({ statCount = 3, cols = 5, rows = 8 }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeaderSkeleton />
        <Skeleton className="h-9 w-36 rounded-xl shrink-0" />
      </div>
      {/* stat row */}
      {statCount > 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(statCount, 4)} gap-4`}>
          {Array.from({ length: statCount }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      )}
      {/* table */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        {/* search bar */}
        <div className="p-4 border-b border-gray-100">
          <Skeleton className="h-9 w-64 rounded-xl" />
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-4 py-3 text-left">
                  <Skeleton className="h-3 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRowSkeleton key={i} cols={cols} />
            ))}
          </tbody>
        </table>
        {/* pagination */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center">
          <Skeleton className="h-3 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Form / settings page */
export function FormPageSkeleton({ fields = 5 }) {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-5 max-w-xl">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
        <Skeleton className="h-10 w-32 rounded-xl mt-2" />
      </div>
    </div>
  );
}

/** Auth page (login/register) */
export function AuthPageSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-8">
        <div className="space-y-2 text-center">
          <Skeleton className="h-8 w-32 mx-auto" />
          <Skeleton className="h-3.5 w-56 mx-auto" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          ))}
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-px flex-1" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-3.5 w-48 mx-auto" />
      </div>
    </div>
  );
}

/** Program detail page */
export function ProgramDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* breadcrumb */}
      <div className="flex gap-2 items-center">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3.5 w-32" />
      </div>
      {/* header + button */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-3.5 w-48" />
        </div>
        <Skeleton className="h-9 w-40 rounded-xl shrink-0" />
      </div>
      {/* balance card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
      {/* download button */}
      <div className="flex justify-end">
        <Skeleton className="h-9 w-36 rounded-xl" />
      </div>
      {/* stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      {/* distribution table */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-32 rounded-xl" />
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["Status","Penerima","Wilayah","Kategori","Tipe","Jumlah","Ringkasan","Aksi"].map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRowSkeleton key={i} cols={8} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Admin sidebar nav skeleton */
export function NavSkeleton() {
  return (
    <>
      {/* Mobile top bar skeleton */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-4 w-24" />
        <div className="w-9" />
      </div>

      {/* Desktop sidebar skeleton */}
      <aside className="hidden lg:flex lg:flex-col w-56 shrink-0 min-h-screen border-r border-gray-200 bg-white sticky top-0 self-start">
        {/* Header */}
        <div className="px-4 py-5 border-b border-gray-100 space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        {/* Nav items */}
        <div className="flex-1 px-3 py-4 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2">
              <Skeleton className="h-4 w-4 rounded shrink-0" />
              <Skeleton className="h-3.5 flex-1" style={{ opacity: 1 - i * 0.08 }} />
            </div>
          ))}
          <div className="my-2 border-t border-gray-100" />
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2">
              <Skeleton className="h-4 w-4 rounded shrink-0" />
              <Skeleton className="h-3.5 flex-1" />
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-3 py-3 border-t border-gray-100 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2">
              <Skeleton className="h-4 w-4 rounded shrink-0" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          ))}
          <Skeleton className="h-2.5 w-20 mx-3 mt-1" />
        </div>
      </aside>
    </>
  );
}

/** Calculator page */
export function CalculatorSkeleton() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-5 max-w-lg">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="rounded-2xl bg-green-50 p-5 space-y-3">
          <Skeleton className="h-3 w-24 bg-green-200" />
          <Skeleton className="h-8 w-40 bg-green-200" />
          <Skeleton className="h-3 w-32 bg-green-200" />
        </div>
      </div>
    </div>
  );
}
