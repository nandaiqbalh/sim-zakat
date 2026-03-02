// components/docs/sections/ProfileSection.jsx

import { Info, CheckCircle2, UserCircle } from "lucide-react";

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

export default function ProfileSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 8</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ganti Profil</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Halaman Akun memungkinkan setiap pengguna memperbarui informasi profil dan mengganti password
          tanpa perlu bantuan administrator.
        </p>
      </div>

      {/* Ubah nama */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">✏️ Mengubah Nama Profil</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka halaman Akun">
            <p>Dari sidebar, klik nama Anda di bagian bawah atau klik menu <strong>Akun Saya</strong>.</p>
          </Step>
          <Step number={2} title="Edit nama di kolom 'Nama Lengkap'">
            <p>Ubah nama sesuai keinginan Anda.</p>
          </Step>
          <Step number={3} title="Klik 'Perbarui Profil'">
            <p>Nama baru akan langsung tersimpan dan tampil di navigasi sidebar.</p>
          </Step>
        </div>
      </section>

      {/* Ganti password */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🔒 Mengganti Password</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka bagian 'Ganti Password'">
            <p>Di halaman Akun, gulir ke bawah ke bagian Ganti Password.</p>
          </Step>
          <Step number={2} title="Isi formulir">
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Password Lama</strong> — verifikasi identitas</li>
              <li><strong>Password Baru</strong> — minimal 8 karakter</li>
              <li><strong>Konfirmasi Password Baru</strong> — harus sama</li>
            </ul>
          </Step>
          <Step number={3} title="Klik 'Ganti Password'">
            <p>Password berhasil diperbarui. Gunakan password baru untuk login berikutnya.</p>
          </Step>
        </div>
      </section>

      {/* Informasi akun */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">ℹ️ Informasi yang Ditampilkan</h2>
        <ul className="space-y-2">
          {[
            "Nama lengkap pengguna",
            "Alamat email (tidak dapat diubah)",
            "Peran di masjid (Manager / Distributor)",
            "Nama masjid yang terdaftar",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={Info} color="blue" title="Email Tidak Dapat Diubah">
          Alamat email digunakan sebagai identitas unik akun dan tidak dapat diubah. Jika perlu ganti email, buat akun baru.
        </InfoBox>
        <InfoBox icon={UserCircle} color="green" title="Keluar Akun">
          Untuk keluar dari akun, klik tombol <strong>Keluar</strong> di bagian bawah sidebar. Anda akan diarahkan kembali ke halaman login.
        </InfoBox>
      </div>
    </div>
  );
}
