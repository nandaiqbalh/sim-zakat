// components/docs/sections/KonversiSection.jsx

import { Info, AlertTriangle, RefreshCcw } from "lucide-react";

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

export default function KonversiSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 4</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Konversi Aset</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Fitur Konversi Aset memungkinkan Anda mengubah saldo beras menjadi nilai uang, atau sebaliknya.
          Ini berguna saat masjid menerima zakat fitrah berupa beras namun ingin mendistribusikan dalam bentuk uang.
        </p>
      </div>

      {/* Ilustrasi konversi */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex-1 text-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
          <p className="text-2xl mb-1">🌾</p>
          <p className="font-semibold text-yellow-800 text-sm">Beras</p>
          <p className="text-xs text-yellow-600 mt-0.5">Saldo kg beras</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full shrink-0">
          <RefreshCcw className="w-5 h-5 text-green-700" />
        </div>
        <div className="flex-1 text-center p-4 bg-green-50 rounded-xl border border-green-100">
          <p className="text-2xl mb-1">💵</p>
          <p className="font-semibold text-green-800 text-sm">Uang</p>
          <p className="text-xs text-green-600 mt-0.5">Saldo rupiah</p>
        </div>
      </div>

      {/* Cara konversi */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🔄 Cara Melakukan Konversi</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka menu 'Konversi Aset'">
            <p>Dari sidebar, klik <strong>Konversi Aset</strong>.</p>
          </Step>
          <Step number={2} title="Isi formulir konversi">
            <p>Lengkapi:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Aset Sumber</strong> — pilih jenis aset yang ingin dikonversi (misal: Beras)</li>
              <li><strong>Jumlah</strong> — berat beras dalam kg yang akan dikonversi</li>
              <li><strong>Harga per kg</strong> — harga beras saat ini (diisi manual sesuai harga pasar)</li>
              <li><strong>Aset Tujuan</strong> — akan menjadi uang (Rupiah)</li>
              <li><strong>Catatan</strong> — keterangan konversi (opsional)</li>
            </ul>
          </Step>
          <Step number={3} title="Cek perhitungan otomatis">
            <p>Sistem otomatis menghitung: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">Total Rupiah = Jumlah kg × Harga per kg</code></p>
          </Step>
          <Step number={4} title="Klik 'Konversi'">
            <p>Saldo beras berkurang, saldo uang bertambah sesuai perhitungan. Transaksi konversi tercatat di riwayat.</p>
          </Step>
        </div>
      </section>

      {/* Riwayat konversi */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">📋 Riwayat Konversi</h2>
        <p className="text-sm text-gray-600">
          Semua riwayat konversi tampil di bagian bawah halaman Konversi Aset, lengkap dengan:
          tanggal, jumlah beras, harga per kg, total uang, dan catatan.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={Info} color="blue" title="Kapan perlu konversi?">
          <ul className="space-y-1">
            <li>• Ingin mendistribusikan zakat dalam bentuk uang tunai</li>
            <li>• Ingin menyamakan satuan saldo untuk pelaporan</li>
            <li>• Beras yang diterima hendak dijual dan hasilnya dibagikan</li>
          </ul>
        </InfoBox>
        <InfoBox icon={AlertTriangle} color="amber" title="Perhatikan harga">
          Harga per kg harus diisi manual sesuai harga pasar saat ini. Pastikan harga yang dimasukkan akurat karena akan mempengaruhi laporan keuangan masjid.
        </InfoBox>
      </div>
    </div>
  );
}
