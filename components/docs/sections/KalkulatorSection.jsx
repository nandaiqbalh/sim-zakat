// components/docs/sections/KalkulatorSection.jsx

import Link from "next/link";
import { Calculator, CheckCircle2, ExternalLink } from "lucide-react";

function FeatureCard({ icon, title, href, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{children}</p>
      <Link
        href={href}
        target="_blank"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 hover:underline transition-colors"
      >
        Buka Kalkulator
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default function KalkulatorSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 9</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fitur Kalkulator</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          SIM Zakat menyediakan kalkulator zakat publik yang dapat diakses oleh siapa saja —
          termasuk muzakki yang ingin menghitung kewajiban mereka secara mandiri sebelum membayar ke masjid.
          Tidak perlu login untuk menggunakan fitur ini.
        </p>
      </div>

      {/* Kalkulator cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeatureCard icon="🌾" title="Kalkulator Zakat Fitrah" href="/calculator/zakat-fitrah">
          Hitung total beras atau uang yang wajib dibayarkan untuk diri sendiri dan seluruh anggota keluarga.
          Mendukung pembayaran dalam bentuk beras maupun uang tunai.
        </FeatureCard>
        <FeatureCard icon="📅" title="Kalkulator Fidyah" href="/calculator/fidyah">
          Hitung total fidyah untuk orang yang tidak mampu berpuasa karena sakit, uzur, atau alasan syar'i lainnya.
          Dapat menghitung untuk beberapa orang dan jumlah hari sekaligus.
        </FeatureCard>
      </div>

      {/* Fitur kalkulator */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">⚙️ Fitur Kalkulator</h2>
        <ul className="space-y-2">
          {[
            "Inputan jumlah jiwa / orang dengan tombol + dan −",
            "Pilihan pembayaran dalam bentuk beras atau uang",
            "Input harga beras per kg yang dapat disesuaikan dengan harga pasar daerah",
            "Tombol harga cepat untuk harga umum (Rp 12.000 – Rp 20.000/kg)",
            "Perhitungan otomatis secara real-time",
            "Rincian per jiwa/hari dan total keseluruhan",
            "Informasi ketentuan fidyah termasuk alasan (sakit, lansia, hamil, musafir)",
            "Tombol reset untuk memulai perhitungan dari awal",
            "Responsif untuk perangkat mobile",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-lg">Coba Kalkulator Sekarang</p>
          <p className="text-sm text-green-100 mt-0.5">Tidak perlu login. Buka dan hitung langsung.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/calculator/zakat-fitrah"
            className="px-4 py-2 bg-white text-green-800 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            Zakat Fitrah
          </Link>
          <Link
            href="/calculator/fidyah"
            className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
          >
            Fidyah
          </Link>
        </div>
      </div>
    </div>
  );
}
