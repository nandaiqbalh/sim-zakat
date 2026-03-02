// app/admin/mustahik/MustahikPageClient.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ZakatButton from "@/components/zakat/ZakatButton";
import MustahikTable from "@/components/mustahik/MustahikTable";
import MustahikFormDialog from "@/components/mustahik/MustahikFormDialog";
import { listMustahikAction } from "@/lib/actions/mustahik.actions";

export default function MustahikPageClient({ initialData, wilayahOptions = [] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialData.mustahiks);
  const [dialog, setDialog] = useState({ open: false, mustahik: null });

  const [currPage, setCurrPage] = useState(initialData.page);
  const [currTotal, setCurrTotal] = useState(initialData.total);
  const [limit] = useState(initialData.limit);
  const [wilayahFilter, setWilayahFilter] = useState(initialData.wilayah || "");
  const [nameFilter, setNameFilter] = useState(initialData.name || "");
  const [categoryFilter, setCategoryFilter] = useState(initialData.category || "");

  const initialLoad = useRef(true);

  useEffect(() => {
    // when filters change (and not on initial mount), reset to first page and update URL
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (wilayahFilter) params.set("wilayah", wilayahFilter);
    if (nameFilter) params.set("name", nameFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { shallow: true });

    loadData(1);
  }, [wilayahFilter, nameFilter, categoryFilter]);

  // functions to fetch paged and filtered data
  const loadData = async (page) => {
    const res = await listMustahikAction({
      page,
      limit,
      wilayah: wilayahFilter,
      name: nameFilter,
      category: categoryFilter,
    });
    if (res.success && res.data) {
      setItems(res.data.mustahiks);
      setCurrTotal(res.data.total);
      setCurrPage(res.data.page);
    } else {
      alert(res.message);
    }
  };

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > Math.max(1, Math.ceil(currTotal / limit))) return;
    const params = new URLSearchParams();
    if (wilayahFilter) params.set("wilayah", wilayahFilter);
    if (nameFilter) params.set("name", nameFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    params.set("page", newPage);
    router.replace(`?${params.toString()}`, { shallow: true });

    loadData(newPage);
  };

  // statistics derived from current items
  const totalCount = items.length;
  const activeCount = items.filter((m) => m.isActive).length;
  const inactiveCount = totalCount - activeCount;

  return (
    <>


      {/* Stats row (dynamic) */}
      {/* Stats row (dynamic) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-xl border border-green-200 shadow-sm p-5 text-center">
          <p className="text-2xl font-bold text-green-700">{activeCount}</p>
          <p className="text-xs text-gray-500 mt-1">Aktif</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-2xl font-bold text-gray-400">{inactiveCount}</p>
          <p className="text-xs text-gray-500 mt-1">Tidak aktif</p>
        </div>
      </div>

      {/* Filters and add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex gap-2 flex-wrap bg-gray-50 p-2 rounded">
          <input
            type="text"
            placeholder="Search nama..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm bg-white"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm bg-white"
          >
            <option value="">Semua kategori</option>
            <option value="FAKIR">Fakir</option>
            <option value="MISKIN">Miskin</option>
            <option value="AMIL">Amil</option>
            <option value="MUALAF">Mualaf</option>
            <option value="GHARIM">Gharim</option>
            <option value="FISABILILLAH">Fisabilillah</option>
            <option value="IBNU_SABIL">Ibnu Sabil</option>
          </select>
          <select
            value={wilayahFilter}
            onChange={(e) => setWilayahFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm bg-white"
          >
            <option value="">Semua wilayah</option>
            {wilayahOptions.map((w) => (
              <option key={w.id} value={w.name}>
                {w.name.charAt(0).toUpperCase() + w.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <ZakatButton onClick={() => setDialog({ open: true, mustahik: null })}>
                  + Tambah Mustahik
        </ZakatButton>
      </div>

      <MustahikTable
        mustahik={items}
        onEdit={(m) => setDialog({ open: true, mustahik: m })}
      />

      {currTotal > limit && (
        <div className="mt-4 flex justify-between text-sm">
          <button
            onClick={() => changePage(currPage - 1)}
            className={`px-3 py-1 rounded ${currPage > 1 ? "bg-green-100 text-green-700" : "text-gray-400"}`}
          >
            Sebelumnya
          </button>
          <span className="text-gray-500">
            {currPage} / {Math.ceil(currTotal / limit)}
          </span>
          <button
            onClick={() => changePage(currPage + 1)}
            className={`px-3 py-1 rounded ${currPage < Math.ceil(currTotal / limit) ? "bg-green-100 text-green-700" : "text-gray-400"}`}
          >
            Berikutnya
          </button>
        </div>
      )}

      <MustahikFormDialog
        open={dialog.open}
        mustahik={dialog.mustahik}
        wilayahOptions={wilayahOptions}
        onClose={(saved) => {
          setDialog({ open: false, mustahik: null });
          if (saved) {
            // if editing replace or if adding append
            setItems((prev) => {
              const idx = prev.findIndex((x) => x.id === saved.id);
              if (idx !== -1) {
                const copy = [...prev];
                copy[idx] = saved;
                return copy;
              }
              return [saved, ...prev];
            });
          }
        }}
      />
    </>
  );
}
