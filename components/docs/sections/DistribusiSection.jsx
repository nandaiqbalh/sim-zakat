// components/docs/sections/DistribusiSection.jsx

import { Info, CheckCircle2, Truck } from "lucide-react";

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

export default function DistribusiSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 7</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Distributor Membagikan</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Staf Distributor bertugas memastikan zakat sampai ke tangan mustahik. Distributor dapat
          melihat program yang aktif dan daftar mustahik penerima yang sudah dikonfigurasi oleh Manager.
        </p>
      </div>

      {/* Alur kerja distributor */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🚚 Alur Kerja Distributor</h2>
        <div className="space-y-4">
          <Step number={1} title="Login dengan akun Distributor">
            <p>Gunakan akun yang sudah didaftarkan sebagai Distributor oleh Manager masjid Anda.</p>
          </Step>
          <Step number={2} title="Buka menu 'Program Distribusi'">
            <p>Dari sidebar, klik <strong>Program Distribusi</strong>. Distributor hanya melihat program yang dibuat Manager untuk masjid yang sama.</p>
          </Step>
          <Step number={3} title="Pilih program yang aktif">
            <p>Klik nama program untuk membuka halaman detail dan melihat daftar mustahik yang perlu menerima distribusi.</p>
          </Step>
          <Step number={4} title="Lihat daftar mustahik penerima">
            <p>Halaman detail program menampilkan semua mustahik yang terdaftar sebagai penerima, beserta jumlah yang perlu diberikan per orang.</p>
          </Step>
                  <Step number={5} title="Unduh laporan (opsional)">
                      <p>Jika Anda butuh cetakan atau daftar offline, klik tombol <strong>Download PDF</strong> di pojok kanan atas untuk mengekspor seluruh daftar distribusi dan ringkasan program.</p>
                  </Step>
                  <Step number={6} title="Distribusikan sesuai daftar">
            <p>Bagikan zakat secara fisik kepada masing-masing mustahik. Data distribusi sudah dicatat di sistem oleh Manager saat memasukkan mustahik ke program.</p>
          </Step>
        </div>
      </section>

      {/* Yang bisa dilakukan distributor */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">✅ Yang Dapat Dilakukan Distributor</h2>
        <ul className="space-y-2">
          {[
            "Melihat daftar program distribusi",
            "Membuka detail program dan daftar mustahik penerima",
            "Melihat jumlah distribusi yang harus diberikan ke setiap mustahik",
            "Melihat info lengkap mustahik (nama, alamat, wilayah) melalui ikon detail",
            "Melihat ringkasan saldo program (anggaran, terpakai, sisa)",
                      "Mengunduh laporan distribusi sebagai file PDF",
            "Mencatat transaksi masuk (input pembayaran zakat dari muzakki)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Yang TIDAK bisa dilakukan distributor */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🚫 Yang Tidak Dapat Dilakukan Distributor</h2>
        <ul className="space-y-2">
          {[
            "Membuat program distribusi baru",
            "Menambah atau menghapus mustahik dari program",
            "Mengelola data mustahik",
            "Melakukan konversi aset",
            "Mengelola data masjid dan staf",
            "Mengakses halaman dashboard laporan",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
              <span className="w-4 h-4 shrink-0 mt-0.5 flex items-center justify-center text-red-400 font-bold text-base">×</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={Truck} color="green" title="Akses Terbatas">
          Pembatasan akses Distributor memastikan data keuangan dan mustahik tetap aman. Hanya Manager yang berwenang mengubah data program.
        </InfoBox>
        <InfoBox icon={Info} color="blue" title="Detail Mustahik">
          Distributor dapat mengklik ikon info (ⓘ) di sebelah nama mustahik untuk melihat alamat lengkap dan nomor telepon — memudahkan pengiriman langsung ke rumah.
        </InfoBox>
      </div>
    </div>
  );
}
