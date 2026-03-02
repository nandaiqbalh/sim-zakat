// components/programs/ProgramDetail.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Clock, MapPin, Check, Info, FileDown } from "lucide-react";
import MustahikDetailDialog from "@/components/mustahik/MustahikDetailDialog";
import ZakatCard from "@/components/zakat/ZakatCard";
import ZakatTable, { ZakatTr, ZakatTd } from "@/components/zakat/ZakatTable";
import ZakatBadge from "@/components/zakat/ZakatBadge";
import ZakatEmptyState from "@/components/zakat/ZakatEmptyState";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { distributeItemAction, removeDistributionItemAction } from "@/lib/actions/program.actions";

function fmt(n) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR", minimumFractionDigits: 0,
    }).format(Number(n) || 0);
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ProgramDetail({ program, mosque = null, balance = {} }) {
    const router = useRouter();
    const [pdfLoading, setPdfLoading] = useState(false);
    const [confirmDistribute, setConfirmDistribute] = useState({ open: false, item: null });
    const [confirmDelete, setConfirmDelete] = useState({ open: false, item: null });
    const [busy, setBusy] = useState({});
    const [detailDialog, setDetailDialog] = useState({ open: false, mustahik: null });
    const searchParams = useSearchParams();
    const [statusFilter, setStatusFilter]   = useState(searchParams.get("status") || "");
    const [wilayahFilter, setWilayahFilter] = useState(searchParams.get("wilayah") || "");
    const pathname = usePathname();

    const updateParams = (updates) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([k, v]) => {
            if (v) params.set(k, v);
            else params.delete(k);
        });
        router.replace(`${pathname}?${params.toString()}`);
    };

    const setItemBusy = (id, val) => setBusy((p) => ({ ...p, [id]: val }));

    // keep state in sync with URL params
    useEffect(() => {
        const s = searchParams.get("status") || "";
        const w = searchParams.get("wilayah") || "";
        setStatusFilter(s);
        setWilayahFilter(w);
    }, [searchParams]);

    const handleDistribute = async () => {
        const item = confirmDistribute.item;
        setItemBusy(item.id, true);
        const res = await distributeItemAction(item.id);
        setItemBusy(item.id, false);
        setConfirmDistribute({ open: false, item: null });
        if (res.success) {
            toast.success(`${item.mustahik.name} berhasil ditandai sudah didistribusikan.`);
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    const handleDelete = async () => {
        const item = confirmDelete.item;
        setItemBusy(item.id, true);
        const res = await removeDistributionItemAction(item.id);
        setItemBusy(item.id, false);
        setConfirmDelete({ open: false, item: null });
        if (res.success) {
            toast.success("Item berhasil dihapus.");
            router.refresh();
        } else {
            toast.error(res.message);
        }
    };

    const handleDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            const { generateProgramPdf } = await import("@/lib/utils/programPdf");
            await generateProgramPdf({ program, mosque, balance });
        } catch (err) {
            console.error("PDF generation failed:", err);
            toast.error("Gagal membuat PDF. Silakan coba lagi.");
        } finally {
            setPdfLoading(false);
        }
    };

    const items = program.items ?? [];
    const pending = items.filter((i) => i.status === "PENDING");
    const done = items.filter((i) => i.status === "DISTRIBUTED");

    // ── Wilayah options derived from items ──
    const wilayahOptions = [
        ...new Set(
            items
                .map((i) => i.mustahik.wilayah?.name)
                .filter(Boolean)
        ),
    ].sort();

    // ── Per-wilayah summary ──
    const wilayahSummary = wilayahOptions.map((wName) => {
        const wItems = items.filter((i) => i.mustahik.wilayah?.name === wName);
        const mustahikSet = new Set(wItems.map((i) => i.mustahik.id));
        const totalCash = wItems.filter((i) => i.assetType === "CASH").reduce((s, i) => s + Number(i.amount), 0);
        const totalRice = wItems.filter((i) => i.assetType === "RICE").reduce((s, i) => s + Number(i.amount), 0);
        const pendingCnt = wItems.filter((i) => i.status === "PENDING").length;
        const doneCnt = wItems.filter((i) => i.status === "DISTRIBUTED").length;
        return { name: wName, mustahikCount: mustahikSet.size, totalCash, totalRice, pendingCnt, doneCnt };
    });

    // ── Filter items ──
    const filteredItems = items.filter((item) => {
        if (statusFilter && item.status !== statusFilter) return false;
        if (wilayahFilter && item.mustahik.wilayah?.name !== wilayahFilter) return false;
        return true;
    });

    // ── Group filtered items per mustahik ──
    const grouped = Object.values(
        filteredItems.reduce((acc, item) => {
            const id = item.mustahik.id;
            if (!acc[id]) {
                acc[id] = { mustahik: item.mustahik, cash: 0, rice: 0, pending: 0, distributed: 0, items: [] };
            }
            if (item.assetType === "CASH") acc[id].cash += Number(item.amount);
            else acc[id].rice += Number(item.amount);
            if (item.status === "PENDING") acc[id].pending++;
            else if (item.status === "DISTRIBUTED") acc[id].distributed++;
            acc[id].items.push(item);
            return acc;
        }, {})
    );

    return (
        <>
            {/* ── Download PDF button ── */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleDownloadPdf}
                    disabled={pdfLoading || items.length === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <FileDown className="w-4 h-4" />
                    {pdfLoading ? "Membuat PDF…" : "Download PDF"}
                </button>
            </div>

            {/* ── Summary stats ── */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <ZakatCard className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{items.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Item</p>
                </ZakatCard>
                <ZakatCard className="text-center border-amber-200">
                    <p className="text-3xl font-bold text-amber-600">{pending.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Menunggu</p>
                </ZakatCard>
                <ZakatCard className="text-center border-green-200">
                    <p className="text-3xl font-bold text-green-700">{done.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Terdistribusi</p>
                </ZakatCard>
            </div>

            {/* ── Per-wilayah summary ── */}
            {wilayahSummary.length > 0 && (
                <ZakatCard className="mb-6">
                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-700" />
                        Ringkasan per Wilayah
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {wilayahSummary.map((w) => (
                            <div
                                key={w.name}
                                className={`bg-gray-50 border rounded-lg p-3 cursor-pointer transition hover:border-green-200 ${wilayahFilter===w.name?"border-green-500":"border-gray-100"}`}
                                onClick={() => {
                                    const newVal = wilayahFilter === w.name ? "" : w.name;
                                    setWilayahFilter(newVal);
                                    updateParams({ wilayah: newVal });
                                }}
                                title="Klik untuk filter"
                            >
                                <p className="font-semibold text-gray-800 text-sm">{capitalize(w.name)}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{w.mustahikCount} mustahik</p>
                                <div className="flex gap-2 mt-1.5 flex-wrap">
                                    {w.totalCash > 0 && (
                                        <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                                            💵 {fmt(w.totalCash)}
                                        </span>
                                    )}
                                    {w.totalRice > 0 && (
                                        <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                                            🌾 {w.totalRice.toFixed(1)} kg
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-3 mt-1.5 text-xs text-gray-400">
                                    <span>{w.pendingCnt} menunggu</span>
                                    <span>{w.doneCnt} selesai</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ZakatCard>
            )}

            {/* ── Distribution list + filters ── */}
            <ZakatCard>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-base font-semibold text-gray-800">Daftar Distribusi</h3>
                    <div className="flex gap-2 flex-wrap">
                        {/* Status filter */}
                        <select
                            className={`text-sm rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 ${statusFilter?"border-green-500":"border-gray-200"}`}
                            value={statusFilter}
                            onChange={(e) => {
                                const val = e.target.value;
                                setStatusFilter(val);
                                updateParams({ status: val });
                            }}
                        >
                            <option value="">Semua status</option>
                            <option value="PENDING">Menunggu</option>
                            <option value="DISTRIBUTED">Terdistribusi</option>
                        </select>
                        {/* Wilayah filter */}
                        {wilayahOptions.length > 0 && (
                            <select
                                className={`text-sm rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 ${wilayahFilter?"border-green-500":"border-gray-200"}`}
                                value={wilayahFilter}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setWilayahFilter(val);
                                    updateParams({ wilayah: val });
                                }}
                            >
                                <option value="">Semua wilayah</option>
                                {wilayahOptions.map((w) => (
                                    <option key={w} value={w}>{capitalize(w)}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {items.length === 0 ? (
                    <ZakatEmptyState
                        title="Belum ada penerima"
                        description="Gunakan tombol Tambah Distribusi untuk menambah mustahik ke program ini."
                        icon={Clock}
                    />
                ) : grouped.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-6">Tidak ada data sesuai filter.</p>
                    ) : (
                            <ZakatTable headers={["Status","Penerima", "Wilayah", "Kategori", "Tipe", "Jumlah", "Ringkasan", "Aksi"]}>
                                {grouped.map((g) => {
                                    let statusLabel="";
                                    let statusVariant="gray";
                                    if (g.pending && g.distributed) {
                                        statusLabel="Campuran";
                                        statusVariant="amber";
                                    } else if (g.distributed) {
                                        statusLabel="Terdistribusi";
                                        statusVariant="green";
                                    } else {
                                        statusLabel="Menunggu";
                                        statusVariant="amber";
                                    }
                                    return (
                                    <ZakatTr key={g.mustahik.id}>
                                        <ZakatTd>
                                            <ZakatBadge label={statusLabel} variant={statusVariant} />
                                        </ZakatTd>
                                            <ZakatTd className="font-medium flex items-center gap-1">
                                                <button
                                                    onClick={() => setDetailDialog({ open: true, mustahik: g.mustahik })}
                                                    className="flex items-center gap-1 text-left cursor-pointer"
                                                >
                                                    {g.mustahik.name}
                                                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            </ZakatTd>
                                <ZakatTd className="text-gray-500 text-xs">
                                    {g.mustahik.wilayah ? capitalize(g.mustahik.wilayah.name) : "—"}
                                </ZakatTd>
                                <ZakatTd>
                                    <ZakatBadge category={g.mustahik.category} />
                                </ZakatTd>
                                <ZakatTd className="flex gap-1">
                                    {g.cash > 0 && <ZakatBadge label="Uang" variant="green" />}
                                    {g.rice > 0 && <ZakatBadge label="Beras" variant="amber" />}
                                </ZakatTd>
                                <ZakatTd className="font-semibold text-green-700">
                                    {g.cash > 0 && fmt(g.cash)}
                                    {g.cash > 0 && g.rice > 0 && <br />}
                                    {g.rice > 0 && `${g.rice.toFixed(2)} kg`}
                                </ZakatTd>
                                <ZakatTd className="text-xs text-gray-500">
                                    {g.distributed > 0 && `${g.distributed} selesai`}
                                    {g.distributed > 0 && g.pending > 0 && ", "}
                                    {g.pending > 0 && `${g.pending} menunggu`}
                                </ZakatTd>
                                {/* aksi: distribusikan/hapus */}
                                <ZakatTd className="flex gap-2">
                                    {g.pending > 0 && (
                                        <button
                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                                            title="Distribusikan item"
                                            onClick={() => {
                                                // pick first pending item for simplicity
                                                const item = g.items.find((i) => i.status === "PENDING");
                                                setConfirmDistribute({ open: true, item });
                                            }}
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>Distribusikan</span>
                                        </button>
                                    )}
                                    {g.pending > 0 && (
                                        <button
                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
                                            title="Hapus item"
                                            onClick={() => {
                                                const item = g.items.find((i) => i.status === "PENDING");
                                                setConfirmDelete({ open: true, item });
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Hapus</span>
                                        </button>
                                    )}
                                </ZakatTd>
                            </ZakatTr>
                        )})}
                    </ZakatTable>
                )}
            </ZakatCard>

            <ConfirmDialog
                open={confirmDistribute.open}
                title="Konfirmasi Distribusi"
                description={`Tandai zakat untuk "${confirmDistribute.item?.mustahik?.name}" sudah didistribusikan? Tindakan ini tidak dapat dibatalkan.`}
                confirmLabel="Ya, Distribusikan"
                onConfirm={handleDistribute}
                onClose={() => setConfirmDistribute({ open: false, item: null })}
            />

            <ConfirmDialog
                open={confirmDelete.open}
                title="Hapus Item"
                description={`Hapus "${confirmDelete.item?.mustahik?.name}" dari program ini?`}
                confirmLabel="Hapus"
                onConfirm={handleDelete}
                onClose={() => setConfirmDelete({ open: false, item: null })}
            />

            <MustahikDetailDialog
                open={detailDialog.open}
                mustahik={detailDialog.mustahik}
                onClose={() => setDetailDialog({ open: false, mustahik: null })}
            />
        </>
    );
}