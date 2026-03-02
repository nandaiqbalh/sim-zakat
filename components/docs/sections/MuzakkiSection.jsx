// components/docs/sections/MuzakkiSection.jsx

import { Info, AlertTriangle, CheckCircle2, Search } from "lucide-react";

function Step({ number, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm font-bold mt-0.5">
        {number}
      </div>
      <div className="flex-1 pb-6 border-l-2 border-dashed border-green-100 pl-4 -ml-4">
        <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-sm text-gray-600 space-y-2">{children}</div>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon = Info, color = "blue", title, children }) {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-800",
    amber: "bg-amber-50 border-amber-100 text-amber-800",
    green: "bg-green-50 border-green-100 text-green-800",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 shrink-0" />
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  );
}

const ASNAF_CATEGORIES = [
  { label: "Fakir",      desc: "Orang yang tidak memiliki harta dan penghasilan" },
  { label: "Miskin",     desc: "Orang yang berpenghasilan namun tidak mencukupi kebutuhan" },
  { label: "Amil",       desc: "Petugas pengelola zakat" },
  { label: "Muallaf",    desc: "Orang yang baru masuk Islam" },
  { label: "Riqab",      desc: "Budak (untuk konteks modern: korban perdagangan manusia)" },
  { label: "Gharimin",   desc: "Orang yang terlilit hutang untuk kebutuhan pokok" },
  { label: "Fisabilillah", desc: "Pejuang di jalan Allah (lembaga pendidikan, dakwah)" },
  { label: "Ibnu Sabil", desc: "Musafir yang kehabisan bekal dalam perjalanan" },
];

export default function MuzakkiSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 5</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Setup Data Mustahik</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Mustahik adalah penerima zakat (8 asnaf). Data mustahik perlu diisi sebelum bisa
          membuat program distribusi. Hanya <strong>Manager</strong> yang dapat mengelola data mustahik.
        </p>
      </div>

      {/* Menambah mustahik */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">➕ Menambah Mustahik Baru</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka menu 'Data Mustahik'">
            <p>Dari sidebar, klik <strong>Data Mustahik</strong>.</p>
          </Step>
          <Step number={2} title="Klik '+ Tambah Mustahik'">
            <p>Dialog form penambahan mustahik akan muncul.</p>
          </Step>
          <Step number={3} title="Isi data mustahik">
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Nama Lengkap</strong></li>
              <li><strong>Kategori</strong> — pilih dari 8 asnaf (lihat tabel di bawah)</li>
              <li><strong>Alamat</strong></li>
              <li><strong>Wilayah / RT-RW</strong> — untuk pengelompokan distribusi per area</li>
              <li><strong>No. Telepon</strong> (opsional)</li>
              <li><strong>Status Aktif</strong> — centang jika mustahik masih aktif menerima</li>
            </ul>
          </Step>
          <Step number={4} title="Klik 'Simpan'">
            <p>Mustahik berhasil ditambahkan ke daftar.</p>
          </Step>
        </div>
      </section>

      {/* 8 Asnaf */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">📌 8 Asnaf (Kategori Mustahik)</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold w-32">Kategori</th>
                <th className="px-4 py-2.5 text-left font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ASNAF_CATEGORIES.map((c, i) => (
                <tr key={c.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 font-semibold text-green-700">{c.label}</td>
                  <td className="px-4 py-3 text-gray-500">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Filter dan pencarian */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🔍 Filter & Pencarian</h2>
        <p className="text-sm text-gray-600 mb-3">
          Halaman Data Mustahik dilengkapi fitur filter untuk memudahkan pencarian:
        </p>
        <ul className="space-y-2">
          {[
            "Cari berdasarkan nama mustahik",
            "Filter berdasarkan kategori (8 asnaf)",
            "Filter berdasarkan wilayah/RT-RW",
            "Klik ikon info (ⓘ) di samping nama untuk melihat detail lengkap mustahik",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={Info} color="blue" title="Tentang Wilayah">
          Field wilayah digunakan untuk mengelompokkan mustahik berdasarkan area geografis (RT/RW/dusun). Ini memudahkan distribusi per zona.
        </InfoBox>
        <InfoBox icon={AlertTriangle} color="amber" title="Status Aktif">
          Mustahik dengan status <strong>tidak aktif</strong> tidak akan muncul di pilihan penerima saat membuat distribusi program.
        </InfoBox>
      </div>
    </div>
  );
}
