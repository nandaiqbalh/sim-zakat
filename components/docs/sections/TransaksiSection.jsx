// components/docs/sections/TransaksiSection.jsx

import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";

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

const TRANSACTION_TYPES = [
  { type: "CASH",   label: "Uang Tunai",   badge: "bg-green-100 text-green-800",  desc: "Zakat berupa uang rupiah" },
  { type: "RICE",   label: "Beras",         badge: "bg-yellow-100 text-yellow-800", desc: "Zakat berupa beras dalam kg" },
  { type: "GOLD",   label: "Emas",          badge: "bg-orange-100 text-orange-800", desc: "Zakat berupa emas" },
  { type: "OTHER",  label: "Lainnya",       badge: "bg-gray-100 text-gray-700",    desc: "Aset zakat selain di atas" },
];

const ZAKAT_CATEGORIES = [
  { label: "Zakat Fitrah", desc: "Kewajiban setiap muslim di bulan Ramadan" },
  { label: "Zakat Maal",   desc: "Zakat harta yang sudah mencapai nisab & haul" },
  { label: "Infaq",        desc: "Sumbangan sukarela tidak wajib" },
  { label: "Sedekah",      desc: "Pemberian sukarela" },
];

export default function TransaksiSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 3</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Catat Transaksi Masuk</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Fitur Transaksi Masuk digunakan untuk mencatat penerimaan zakat, infaq, dan sedekah dari muzakki.
          Hanya pengguna dengan peran <strong>Manager</strong> yang dapat mengakses fitur ini secara penuh.
        </p>
      </div>

      {/* Mencatat transaksi baru */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">➕ Mencatat Transaksi Baru</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka menu 'Transaksi Masuk'">
            <p>Dari sidebar, klik <strong>Transaksi Masuk</strong>.</p>
          </Step>
          <Step number={2} title="Klik '+ Transaksi Baru'">
            <p>Form pencatatan transaksi akan muncul.</p>
          </Step>
          <Step number={3} title="Isi detail transaksi">
            <p>Lengkapi formulir berikut:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Nama Muzakki</strong> — nama pembayar zakat</li>
              <li><strong>Jenis Aset</strong> — pilih jenis pembayaran (lihat tabel di bawah)</li>
              <li><strong>Jumlah</strong> — nominal uang (Rp) atau berat beras (kg)</li>
              <li><strong>Kategori Zakat</strong> — jenis zakat yang dibayarkan</li>
              <li><strong>Tanggal</strong> — tanggal penerimaan (default: hari ini)</li>
              <li><strong>Catatan</strong> — keterangan tambahan (opsional)</li>
            </ul>
          </Step>
          <Step number={4} title="Klik 'Simpan'">
            <p>Transaksi tersimpan dan otomatis mempengaruhi saldo masjid.</p>
          </Step>
        </div>
      </section>

      {/* Tipe transaksi */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">💰 Jenis Aset Transaksi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TRANSACTION_TYPES.map((t) => (
            <div key={t.type} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.badge}`}>{t.label}</span>
              <p className="text-xs text-gray-600 mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kategori zakat */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">📂 Kategori Zakat</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Kategori</th>
                <th className="px-4 py-2.5 text-left font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ZAKAT_CATEGORIES.map((c) => (
                <tr key={c.label} className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-800">{c.label}</td>
                  <td className="px-4 py-3 text-gray-500">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Melihat riwayat */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Melihat Riwayat Transaksi</h2>
        <p className="text-sm text-gray-600 mb-3">
          Semua transaksi yang pernah dicatat tampil dalam daftar di halaman Transaksi Masuk dengan fitur:
        </p>
        <ul className="space-y-2">
          {[
            "Filter berdasarkan jenis aset (uang, beras, dll)",
            "Filter berdasarkan kategori zakat",
            "Tampilan saldo total per jenis aset",
            "Pagination untuk navigasi halaman",
            "Edit dan hapus transaksi yang sudah ada",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <InfoBox icon={AlertTriangle} color="amber" title="Perhatian">
        Menghapus transaksi akan mengurangi saldo masjid. Pastikan data yang dihapus memang sudah tidak diperlukan.
      </InfoBox>
    </div>
  );
}
