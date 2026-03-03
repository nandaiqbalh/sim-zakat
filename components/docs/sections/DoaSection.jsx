// components/docs/sections/DoaSection.jsx

import Link from "next/link";
import { CheckCircle2, ExternalLink, Heart, HandCoins, BookOpen } from "lucide-react";

function ContentCard({ emoji, title, sub, href }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{title}</h3>
      <p className="text-sm text-gray-500">{sub}</p>
    </Link>
  );
}

export default function DoaSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 10</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Niat &amp; Doa Zakat</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          SIM Zakat menyediakan halaman referensi niat dan doa zakat yang dapat diakses oleh siapa saja
          tanpa perlu login. Tersedia teks Arab berkualitas tinggi, transliterasi latin, dan terjemahan
          Indonesia yang akurat — lengkap dengan tombol salin satu klik.
        </p>
      </div>

      {/* Content overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ContentCard
          emoji="🤲"
          title="Niat Zakat Fitrah"
          sub="6 lafal — untuk diri sendiri, istri, anak, keluarga, dan yang diwakilkan."
          href="/doa#zakat-fitrah"
        />
        <ContentCard
          emoji="💚"
          title="Doa Penerima Zakat"
          sub="Doa yang dianjurkan bagi mustahik untuk mendoakan pemberi zakat."
          href="/doa#penerima"
        />
        <ContentCard
          emoji="📿"
          title="Niat Fidyah"
          sub="3 lafal — untuk diri sendiri, orang lain, dan puasa Ramadan yang ditinggalkan."
          href="/doa#fidyah"
        />
      </div>

      {/* Feature list */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">⚙️ Fitur Halaman Doa &amp; Niat</h2>
        <ul className="space-y-2.5">
          {[
            "Teks Arab menggunakan font kaligrafi Scheherazade New berkualitas tinggi",
            "Transliterasi latin yang mudah dibaca dengan tanda baca panjang",
            "Terjemahan Indonesia yang akurat dan mudah dipahami",
            "Tombol salin teks Arab satu klik — mudah dibagikan ke WhatsApp",
            "Navigasi cepat (quick jump) ke tiap bagian: Zakat Fitrah, Doa Penerima, Fidyah",
            "Tampilan responsif dan nyaman di layar kecil (mobile)",
            "Tidak perlu login — bisa diakses kapan saja dan siapa saja",
            "Sumber rujukan dari NU Online yang terpercaya",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* How to use */}
      <section className="bg-green-50 border border-green-100 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-green-800 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Cara Menggunakan
        </h2>
        <ol className="space-y-3">
          {[
            { step: 1, text: "Buka halaman /doa dari menu navigasi atau kalkulator." },
            { step: 2, text: "Pilih bagian yang kamu butuhkan: Zakat Fitrah, Doa Penerima, atau Fidyah." },
            { step: 3, text: "Baca lafal niat dalam hati — melafalkan dengan lisan hukumnya sunnah." },
            { step: 4, text: "Klik tombol \"Salin\" untuk menyalin teks Arab ke clipboard, lalu bagikan ke WhatsApp atau catatan." },
          ].map(({ step, text }) => (
            <li key={step} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="shrink-0 w-6 h-6 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {step}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-lg">Buka Halaman Niat &amp; Doa</p>
          <p className="text-sm text-green-100 mt-0.5">
            10 lafal niat lengkap — Arab, latin, dan terjemahan Indonesia.
          </p>
        </div>
        <Link
          href="/doa"
          target="_blank"
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white text-green-800 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors"
        >
          🤲 Buka Halaman Doa
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
