// components/docs/sections/SetupMasjidSection.jsx

import { CheckCircle2, Info, AlertTriangle, Users } from "lucide-react";

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
    red: "bg-red-50 border-red-100 text-red-800",
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

function RoleBadge({ role, color }) {
  const colors = { green: "bg-green-100 text-green-800", blue: "bg-blue-100 text-blue-800" };
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>{role}</span>
  );
}

export default function SetupMasjidSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 2</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Setup Masjid & Staf</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Setelah login pertama kali, Anda perlu mendaftarkan data masjid Anda.
          Pengguna pertama yang mendaftarkan masjid akan otomatis menjadi <strong>Manager</strong>.
        </p>
      </div>

      {/* Setup masjid */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🕌 Setup Data Masjid</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka menu 'Setup Masjid'">
            <p>Dari sidebar, klik <strong>Masjid</strong>. Jika masjid belum terdaftar, Anda akan melihat formulir pendaftaran masjid.</p>
          </Step>
          <Step number={2} title="Isi data masjid">
            <p>Lengkapi formulir berikut:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Nama Masjid</strong> — nama resmi masjid</li>
              <li><strong>Alamat</strong> — alamat lengkap masjid</li>
              <li><strong>Kota / Kabupaten</strong></li>
              <li><strong>Provinsi</strong></li>
              <li><strong>Kontak</strong> — nomor telepon atau WhatsApp masjid (opsional)</li>
            </ul>
          </Step>
          <Step number={3} title="Simpan data">
            <p>Klik <strong>Simpan</strong>. Data masjid Anda tersimpan dan Anda otomatis terdaftar sebagai <RoleBadge role="MANAGER" color="green" /> masjid tersebut.</p>
          </Step>
        </div>
      </section>

      {/* Setup staf */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">👥 Menambahkan Staf / Petugas</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manager dapat mengundang pengguna lain untuk bergabung ke masjid sebagai staf dengan berbagai peran.
        </p>
        <div className="space-y-4">
          <Step number={1} title="Buka halaman Masjid">
            <p>Dari sidebar, klik <strong>Masjid</strong> → gulir ke bawah ke bagian <strong>Daftar Staf</strong>.</p>
          </Step>
          <Step number={2} title="Klik '+ Tambah Staf'">
            <p>Dialog penambahan staf akan muncul.</p>
          </Step>
          <Step number={3} title="Masukkan email staf dan pilih peran">
            <p>Masukkan email akun SIM Zakat yang sudah terdaftar, lalu pilih peran:</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                <RoleBadge role="MANAGER" color="green" />
                <p className="text-xs text-green-700 mt-0.5">Dapat mengelola seluruh data: transaksi, mustahik, program, dan laporan. Bisa menambah/menghapus staf.</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <RoleBadge role="DISTRIBUTOR" color="blue" />
                <p className="text-xs text-blue-700 mt-0.5">Hanya dapat mencatat distribusi dari program yang sudah dibuat Manager. Tidak bisa mengelola data lainnya.</p>
              </div>
            </div>
          </Step>
          <Step number={4} title="Klik 'Tambah'">
            <p>Staf berhasil ditambahkan. Mereka akan melihat masjid ini di dashboard mereka saat login.</p>
          </Step>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={AlertTriangle} color="amber" title="Satu Masjid per Akun">
          Satu akun hanya bisa menjadi <strong>Manager</strong> di satu masjid. Namun, satu akun bisa menjadi Distributor di beberapa masjid sekaligus.
        </InfoBox>
        <InfoBox icon={Users} color="blue" title="Menghapus Staf">
          Manager dapat menghapus staf dari halaman Masjid dengan menekan ikon hapus di sebelah nama staf.
        </InfoBox>
      </div>
    </div>
  );
}
