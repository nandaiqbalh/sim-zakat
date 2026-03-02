// lib/utils/programPdf.js
// Client-side PDF report generator for distribution programs.
// Call generateProgramPdf({ program, mosque, balance }) from a "use client" component.

const GREEN      = [27, 94, 32];
const WHITE      = [255, 255, 255];
const DARK       = [30, 30, 30];
const GRAY       = [90, 90, 90];
const LIGHT_GRAY = [245, 245, 245];
const AMBER      = [180, 100, 0];
const GREEN_LIGHT = [200, 230, 201];

const CATEGORY_LABELS = {
  FAKIR: "Fakir",
  MISKIN: "Miskin",
  AMIL: "Amil",
  MUALAF: "Mualaf",
  GHARIM: "Gharim",
  FISABILILLAH: "Fisabilillah",
  IBNU_SABIL: "Ibnu Sabil",
};

function fmt(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function fmtKg(n) {
  return `${Number(n).toFixed(2)} kg`;
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalize(str) {
  if (!str) return "-";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function generateProgramPdf({ program, mosque, balance }) {
  // Dynamic imports – only pulled in the browser when user clicks Download
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW  = doc.internal.pageSize.getWidth();   // 210
  const pageH  = doc.internal.pageSize.getHeight();  // 297
  const margin = 15;
  const cw     = pageW - margin * 2; // content width

  // ─────────────────────────────────────────────────
  // [1] HEADER  – green banner
  // ─────────────────────────────────────────────────
  const HEADER_H = 44;
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, pageW, HEADER_H, "F");

  // Mosque name (left)
  doc.setTextColor(...WHITE);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(mosque?.name || "Masjid", margin, 13);

  // Mosque address (left, smaller)
  if (mosque?.address) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const addressLines = doc.splitTextToSize(mosque.address, cw * 0.55);
    doc.text(addressLines, margin, 20);
  }

  // Report meta (right side)
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LAPORAN DISTRIBUSI ZAKAT", pageW - margin, 10, { align: "right" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const programNameLines = doc.splitTextToSize(program.name, cw * 0.45);
  doc.text(programNameLines, pageW - margin, 17, { align: "right" });

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const metaY = 17 + programNameLines.length * 5;
  doc.text(`Dibuat : ${fmtDate(program.createdAt)}`, pageW - margin, metaY, { align: "right" });
  doc.text(`Oleh   : ${program.createdBy?.name ?? "-"}`, pageW - margin, metaY + 5, { align: "right" });
  doc.text(`Dicetak: ${fmtDate(new Date())}`, pageW - margin, metaY + 10, { align: "right" });

  // ─────────────────────────────────────────────────
  // [2] SUMMARY
  // ─────────────────────────────────────────────────
  let y = HEADER_H + 8;

  doc.setTextColor(...DARK);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("RINGKASAN PROGRAM", margin, y);
  y += 2;

  // thin green underline
  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageW - margin, y);
  y += 4;

  const items       = program.items ?? [];
  const distributed = items.filter((i) => i.status === "DISTRIBUTED");
  const pending     = items.filter((i) => i.status === "PENDING");
  const mustahikSet = new Set(items.map((i) => i.mustahik.id));

  const totalCash = items.filter((i) => i.assetType === "CASH").reduce((s, i) => s + Number(i.amount), 0);
  const totalRice = items.filter((i) => i.assetType === "RICE").reduce((s, i) => s + Number(i.amount), 0);
  const distCash  = distributed.filter((i) => i.assetType === "CASH").reduce((s, i) => s + Number(i.amount), 0);
  const distRice  = distributed.filter((i) => i.assetType === "RICE").reduce((s, i) => s + Number(i.amount), 0);

  // Build 3-column summary  (Penerimaan Masjid | Konversi | Distribusi Program)
  const cashIn              = balance?.cashIn              ?? 0;
  const riceIn              = balance?.riceIn              ?? 0;
  const cashConverted       = balance?.cashConverted       ?? 0;
  const riceFromConversion  = balance?.riceFromConversion  ?? 0;

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    tableWidth: cw,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
      lineColor: [200, 200, 200],
      textColor: DARK,
    },
    headStyles: {
      fillColor: GREEN,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "center" },
    },
    head: [[
      "Penerimaan Zakat (Masjid)",
      "Konversi Aset (Masjid)",
      "Distribusi Program Ini",
    ]],
    body: [[
      // Penerimaan
      `Uang Masuk : ${fmt(cashIn)}\nBeras Masuk : ${fmtKg(riceIn)}`,
      // Konversi
      cashConverted > 0
        ? `${fmt(cashConverted)}\n→ ${fmtKg(riceFromConversion)}`
        : "—",
      // Distribusi program
      `Total  : ${items.length} item (${mustahikSet.size} penerima)\nSelesai: ${distributed.length} item\nPending: ${pending.length} item`,
    ]],
  });

  y = doc.lastAutoTable.finalY + 4;

  // Second summary row: amount totals
  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    tableWidth: cw,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
      lineColor: [200, 200, 200],
      textColor: DARK,
    },
    headStyles: {
      fillColor: [66, 124, 70],
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
    },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
    },
    head: [[
      "Total Dialokasikan (Uang)",
      "Total Dialokasikan (Beras)",
      "Sudah Didistribusikan (Uang)",
      "Sudah Didistribusikan (Beras)",
    ]],
    body: [[
      totalCash > 0 ? fmt(totalCash) : "—",
      totalRice > 0 ? fmtKg(totalRice) : "—",
      distCash  > 0 ? fmt(distCash)  : "—",
      distRice  > 0 ? fmtKg(distRice)  : "—",
    ]],
  });

  y = doc.lastAutoTable.finalY + 8;

  // ─────────────────────────────────────────────────
  // [3] DISTRIBUTION LIST
  // ─────────────────────────────────────────────────
  doc.setTextColor(...DARK);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("DAFTAR PENERIMA DISTRIBUSI", margin, y);
  y += 2;

  doc.setDrawColor(...GREEN);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageW - margin, y);
  y += 4;

  // Build table rows – group by mustahik then show each item
  const tableRows = items.map((item, idx) => [
    idx + 1,
    item.mustahik?.name ?? "-",
    CATEGORY_LABELS[item.mustahik?.category] ?? item.mustahik?.category ?? "-",
    capitalize(item.mustahik?.wilayah?.name ?? "-"),
    item.assetType === "CASH" ? "Uang" : "Beras",
    item.assetType === "CASH" ? fmt(item.amount) : fmtKg(item.amount),
    item.status === "DISTRIBUTED" ? "Selesai" : "Menunggu",
    item.distributor?.name ?? "-",
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    tableWidth: cw,
    theme: "striped",
    styles: {
      fontSize: 7.5,
      cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
      overflow: "linebreak",
      textColor: DARK,
    },
    headStyles: {
      fillColor: GREEN,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: [240, 248, 240],
    },
    columnStyles: {
      0:  { halign: "center", cellWidth: 8 },   // No
      1:  { cellWidth: 36 },                    // Nama
      2:  { cellWidth: 22 },                    // Kategori
      3:  { cellWidth: 22 },                    // Wilayah
      4:  { halign: "center", cellWidth: 14 },  // Jenis
      5:  { halign: "right",  cellWidth: 26 },  // Jumlah
      6:  { halign: "center", cellWidth: 18 },  // Status
      7:  { cellWidth: "auto" },                // Petugas
    },
    head: [["No", "Nama Penerima", "Kategori", "Wilayah", "Jenis", "Jumlah", "Status", "Petugas"]],
    body: tableRows,
    didParseCell(data) {
      if (data.section === "body" && data.column.index === 6) {
        const val = data.cell.raw;
        if (val === "Selesai") {
          data.cell.styles.textColor = [27, 94, 32];
          data.cell.styles.fontStyle = "bold";
        } else {
          data.cell.styles.textColor = [...AMBER];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
    // Add total footer row
    foot: [[
      "",
      `${mustahikSet.size} penerima`,
      "",
      "",
      "",
      totalCash  > 0 && totalRice  > 0
        ? `${fmt(totalCash)} / ${fmtKg(totalRice)}`
        : totalCash > 0 ? fmt(totalCash) : fmtKg(totalRice),
      `${distributed.length}/${items.length} selesai`,
      "",
    ]],
    footStyles: {
      fillColor: GREEN_LIGHT,
      textColor: DARK,
      fontStyle: "bold",
      fontSize: 8,
    },
    showFoot: "lastPage",
    // Page break handling
    didDrawPage(data) {
      // Re-draw page number footer on each page
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(7);
      doc.setTextColor(...GRAY);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Halaman ${data.pageNumber}`,
        pageW - margin,
        pageH - 6,
        { align: "right" }
      );
      doc.text(
        "Generated by sim-zakat.nandaiqbalh.com",
        margin,
        pageH - 6
      );
    },
  });

  // ─────────────────────────────────────────────────
  // [4] SIGNATURE SECTION  (on last page)
  // ─────────────────────────────────────────────────
  const finalY = doc.lastAutoTable.finalY;
  const sigHeight = 52;
  const currentPage = doc.internal.getCurrentPageInfo().pageNumber;

  // If not enough room, add new page
  if (finalY + sigHeight > pageH - 20) {
    doc.addPage();
  }

  let sigY = doc.internal.getCurrentPageInfo().pageNumber > currentPage
    ? 20
    : finalY + 10;

  const rightCol = pageW - margin;
  const sigBlockW = 70;
  const sigBlockX = rightCol - sigBlockW;

  doc.setTextColor(...DARK);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const printDateStr = fmtDate(new Date());
  // "Place, date" line on the right
  doc.text(
    `${mosque?.address ? mosque.address.split(",")[0] + ", " : ""}${printDateStr}`,
    sigBlockX + sigBlockW / 2,
    sigY,
    { align: "center" }
  );
  sigY += 5;

  doc.setFont("helvetica", "bold");
  doc.text("Mengetahui,", sigBlockX + sigBlockW / 2, sigY, { align: "center" });
  sigY += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Ketua Takmir ${mosque?.name || "Masjid"}`, sigBlockX + sigBlockW / 2, sigY, { align: "center" });
  sigY += 24; // blank space for signature

  // Signature line
  doc.setDrawColor(...DARK);
  doc.setLineWidth(0.4);
  doc.line(sigBlockX + 8, sigY, sigBlockX + sigBlockW - 8, sigY);
  sigY += 4;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text("( Nama & Tanda Tangan )", sigBlockX + sigBlockW / 2, sigY, { align: "center" });

  // ─────────────────────────────────────────────────
  // Footer on last page (generated by)
  // ─────────────────────────────────────────────────
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Generated by sim-zakat.nandaiqbalh.com",
    margin,
    pageH - 6
  );
  doc.text(
    `Halaman ${doc.internal.getNumberOfPages()}`,
    pageW - margin,
    pageH - 6,
    { align: "right" }
  );

  // ─────────────────────────────────────────────────
  // SAVE
  // ─────────────────────────────────────────────────
  const safeName = program.name.replace(/[^a-zA-Z0-9_\-]/g, "_");
  doc.save(`Laporan_${safeName}_${new Date().toISOString().slice(0, 10)}.pdf`);
}
