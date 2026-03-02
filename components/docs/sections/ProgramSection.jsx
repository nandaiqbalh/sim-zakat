// components/docs/sections/ProgramSection.jsx

import { Info, AlertTriangle, CheckCircle2, Package } from "lucide-react";

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

export default function ProgramSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 6</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Setup Program Distribusi</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Program Distribusi adalah wadah untuk mendistribusikan zakat kepada mustahik secara terorganisir.
          Setiap program memiliki anggaran, jenis aset, dan daftar penerima (mustahik) yang dapat dikonfigurasi.
          Hanya <strong>Manager</strong> yang bisa membuat program baru.
        </p>
      </div>

      {/* Membuat program */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">📦 Membuat Program Baru</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka menu 'Program Distribusi'">
            <p>Dari sidebar, klik <strong>Program Distribusi</strong>.</p>
          </Step>
          <Step number={2} title="Klik '+ Program Baru'">
            <p>Dialog pembuatan program muncul. (Tombol ini hanya muncul untuk Manager.)</p>
          </Step>
          <Step number={3} title="Isi detail program">
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Nama Program</strong> — contoh: "Distribusi Zakat Fitrah 1446H"</li>
              <li><strong>Deskripsi</strong> — penjelasan singkat program</li>
              <li><strong>Jenis Aset</strong> — Uang (CASH) atau Beras (RICE)</li>
              <li><strong>Anggaran</strong> — total dana yang dialokasikan untuk program ini</li>
              <li><strong>Tanggal Mulai & Selesai</strong></li>
            </ul>
          </Step>
          <Step number={4} title="Klik 'Simpan'">
            <p>Program berhasil dibuat dan muncul di daftar program.</p>
          </Step>
        </div>
      </section>

      {/* Menambahkan mustahik ke program */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">👥 Menambahkan Mustahik ke Program</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka detail program">
            <p>Dari daftar program, klik nama program untuk membuka halaman detailnya.</p>
          </Step>
          <Step number={2} title="Klik '+ Tambah Distribusi'">
            <p>Anda akan diarahkan ke halaman form penambahan distribusi.</p>
          </Step>
          <Step number={3} title="Isi data distribusi">
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Mustahik</strong> — pilih penerima dari daftar mustahik aktif</li>
              <li><strong>Filter Wilayah</strong> — saring mustahik berdasarkan wilayah untuk memudahkan pencarian</li>
              <li><strong>Jenis Aset</strong> — sesuaikan dengan jenis program (Uang/Beras)</li>
              <li><strong>Jumlah</strong> — nominal rupiah atau kg beras yang diberikan</li>
            </ul>
          </Step>
          <Step number={4} title="Klik 'Simpan'">
            <p>Mustahik berhasil ditambahkan ke daftar penerima program. Saldo program berkurang sesuai jumlah distribusi.</p>
          </Step>
        </div>
      </section>

      {/* Fitur detail program */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🔎 Fitur Halaman Detail Program</h2>
        <ul className="space-y-2">
          {[
            "Kartu ringkasan: anggaran total, terpakai, dan sisa saldo",
            "Daftar mustahik penerima beserta jumlah distribusi",
            "Klik ikon info (ⓘ) untuk melihat detail lengkap mustahik",
            "Hapus mustahik dari program distribusi",
            "Status program (aktif/selesai)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={Package} color="green" title="Saldo Program">
          Anggaran program dipotong dari saldo masjid. Pastikan saldo masjid mencukupi sebelum membuat program distribusi baru.
        </InfoBox>
        <InfoBox icon={AlertTriangle} color="amber" title="Distributor & Program">
          Staf Distributor dapat melihat daftar program, namun hanya Manager yang bisa membuat program baru dan menambahkan mustahik penerima.
        </InfoBox>
      </div>
    </div>
  );
}
