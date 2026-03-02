// components/docs/sections/LoginRegisterSection.jsx

import { CheckCircle2, Info, AlertTriangle, Lock } from "lucide-react";

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

export default function LoginRegisterSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 1</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Login & Daftar</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          SIM Zakat menggunakan sistem akun berbasis email. Satu akun dapat mengelola satu masjid
          sebagai Manager, atau bergabung ke masjid lain sebagai staf Distributor.
        </p>
      </div>

      {/* Daftar akun */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">📝 Cara Mendaftar Akun</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka halaman Daftar">
            <p>Kunjungi <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/register</code> atau klik tombol <strong>Daftar Gratis</strong> di halaman beranda.</p>
          </Step>
          <Step number={2} title="Isi formulir pendaftaran">
            <p>Masukkan:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Nama lengkap</strong> — akan tampil di halaman profil</li>
              <li><strong>Alamat email</strong> — digunakan untuk login</li>
              <li><strong>Password</strong> — minimal 8 karakter, kombinasi huruf dan angka dianjurkan</li>
              <li><strong>Konfirmasi password</strong> — harus sama dengan password</li>
            </ul>
          </Step>
          <Step number={3} title="Klik 'Daftar'">
            <p>Setelah berhasil, Anda akan otomatis diarahkan ke halaman login. Gunakan email dan password yang baru saja didaftarkan.</p>
          </Step>
        </div>
      </section>

      {/* Login */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">🔐 Cara Login</h2>
        <div className="space-y-4">
          <Step number={1} title="Buka halaman Login">
            <p>Kunjungi <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/login</code> atau klik tombol <strong>Masuk</strong> di beranda.</p>
          </Step>
          <Step number={2} title="Masukkan email dan password">
            <p>Gunakan email dan password yang sudah didaftarkan sebelumnya.</p>
          </Step>
          <Step number={3} title="Klik 'Masuk'">
            <p>Jika berhasil, Anda akan diarahkan ke <strong>Dashboard</strong> admin.</p>
          </Step>
        </div>
      </section>

      {/* Info boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox icon={CheckCircle2} color="green" title="Ketentuan Password">
          <ul className="space-y-1">
            <li>✓ Minimal 8 karakter</li>
            <li>✓ Dianjurkan kombinasi huruf besar, kecil, dan angka</li>
            <li>✓ Jangan gunakan informasi pribadi yang mudah ditebak</li>
          </ul>
        </InfoBox>
        <InfoBox icon={AlertTriangle} color="amber" title="Lupa Password?">
          Saat ini fitur reset password melalui email belum tersedia. Hubungi administrator sistem jika Anda lupa password.
        </InfoBox>
        <InfoBox icon={Info} color="blue" title="Peran Pengguna">
          <p className="mb-1">Setiap akun dapat memiliki peran berbeda per masjid:</p>
          <ul className="space-y-1">
            <li>• <strong>Manager</strong> — mengelola data, program, dan laporan</li>
            <li>• <strong>Distributor</strong> — hanya mencatat distribusi</li>
          </ul>
        </InfoBox>
        <InfoBox icon={Lock} color="blue" title="Keamanan Sesi">
          Sesi login akan otomatis berakhir setelah tidak aktif dalam jangka waktu tertentu. Selalu klik <strong>Keluar</strong> setelah selesai, terutama di perangkat bersama.
        </InfoBox>
      </div>
    </div>
  );
}
