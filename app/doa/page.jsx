// app/doa/page.jsx
import Link from "next/link";
import { BookOpen, Heart, HandCoins, ChevronRight } from "lucide-react";
import CopyButton from "@/components/doa/CopyButton";

export const metadata = {
  title: "Niat & Doa Zakat — SIM Zakat",
  description:
    "Kumpulan niat zakat fitrah untuk diri sendiri, istri, anak, dan keluarga, serta doa fidyah dan doa penerima zakat, lengkap dengan tulisan Arab, latin, dan terjemahan.",
};

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */

const ZAKAT_FITRAH = [
  {
    label: "Untuk Diri Sendiri",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِيْ فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija zakâtal fithri 'an nafsî fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan zakat fitrah untuk diriku sendiri, fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Untuk Istri",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ زَوْجَتِيْ فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija zakâtal fithri 'an zaujatî fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan zakat fitrah untuk istriku, fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Untuk Anak Laki-laki",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ وَلَدِيْ ... فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija zakâtal fithri 'an waladî (sebutkan nama) fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan zakat fitrah untuk anak laki-lakiku (sebutkan nama), fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Untuk Anak Perempuan",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ بِنْتِيْ ... فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija zakâtal fithri 'an bintî (sebutkan nama) fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan zakat fitrah untuk anak perempuanku (sebutkan nama), fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Untuk Diri Sendiri dan Keluarga",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنِّيْ وَعَنْ جَمِيْعِ مَا تَلْزَمُنِيْ نَفَقَاتُهُمْ شَرْعًا فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija zakâtal fithri 'annî wa 'an jamî'i mâ talzamunî nafaqâtuhum fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan zakat fitrah untuk diriku dan seluruh orang yang nafkahnya menjadi tanggunganku, fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Untuk Orang yang Diwakilkan",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ (.....) فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija zakâtal fithri 'an (sebutkan nama) fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan zakat fitrah untuk (sebutkan nama spesifik), fardu karena Allah Ta'âlâ.",
  },
];

const DOA_PENERIMA = [
  {
    label: "Doa Penerima untuk Pemberi Zakat",
    arab: "آجَرَكَ اللهُ فِيْمَا أَعْطَيْتَ وَبَارَكَ فِيْمَا أَبْقَيْتَ وَجَعَلَهُ لَكَ طَهُوْرًا",
    latin: "Âjarakallâhu fî mâ a'thaita wa bâraka fî mâ abqaita wa ja'alahu laka thahûran",
    arti: "Semoga Allah memberikan pahala atas apa yang engkau berikan, dan semoga Allah memberikan berkah atas harta yang kau simpan dan menjadikannya sebagai pembersih bagimu.",
  },
];

const FIDYAH = [
  {
    label: "Niat Fidyah untuk Diri Sendiri",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ الْفِدْيَةَ عَنِّيْ فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija al-fidyata 'annî fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan fidyah untuk diriku sendiri, fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Niat Fidyah untuk Orang Lain (Diwakilkan)",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ الْفِدْيَةَ عَنْ (.....) فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija al-fidyata 'an (sebutkan nama) fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan fidyah untuk (sebutkan nama), fardu karena Allah Ta'âlâ.",
  },
  {
    label: "Niat Fidyah Puasa Ramadan yang Ditinggalkan",
    arab: "نَوَيْتُ أَنْ أُخْرِجَ الْفِدْيَةَ عَنْ صَوْمِ رَمَضَانَ فَرْضًا لِلهِ تَعَالَى",
    latin: "Nawaitu an ukhrija al-fidyata 'an shaumi Ramadhâna fardhan lillâhi ta'âlâ",
    arti: "Aku niat mengeluarkan fidyah untuk (mengganti) puasa Ramadan, fardu karena Allah Ta'âlâ.",
  },
];

/* ─────────────────────────────────────────────────────────
   Components
───────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────
   Components
───────────────────────────────────────────────────────── */

function DoaCard({ arab, latin, arti, label, index, accentColor = "green" }) {
  const accent = {
    green: "bg-green-700",
    teal:  "bg-teal-700",
    amber: "bg-amber-700",
  }[accentColor];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* label strip */}
      <div className={`${accent} px-5 py-2.5 flex items-center justify-between gap-3`}>
        <span className="text-xs font-semibold text-white/90 uppercase tracking-wide truncate">
          {index !== undefined ? `${index + 1}. ` : ""}{label}
        </span>
        <CopyButton text={arab} />
      </div>

      <div className="p-5 space-y-4">
        {/* Arabic */}
        <p
          dir="rtl"
          lang="ar"
          className="text-2xl sm:text-3xl leading-loose text-gray-900 text-right select-all"
          style={{ fontFamily: "'Scheherazade New', 'Amiri', serif", lineHeight: "2.6" }}
        >
          {arab}
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-100" />

        {/* Latin */}
        <p className="text-sm italic text-green-800 leading-relaxed">{latin}</p>

        {/* Terjemahan */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Artinya:</p>
          <p className="text-sm text-amber-900 leading-relaxed">&ldquo;{arti}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ id, icon: Icon, title, description, color = "green", count }) {
  const colors = {
    green: { wrap: "bg-green-50 text-green-700 border-green-100", icon: "bg-green-100" },
    teal:  { wrap: "bg-teal-50  text-teal-700  border-teal-100",  icon: "bg-teal-100" },
    amber: { wrap: "bg-amber-50 text-amber-700 border-amber-100", icon: "bg-amber-100" },
  };
  const c = colors[color];
  return (
    <div id={id} className={`rounded-2xl border p-5 mb-6 flex items-start gap-4 ${c.wrap} scroll-mt-20`}>
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${c.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-bold">{title}</h2>
          {count && (
            <span className="text-xs font-semibold bg-white/70 px-2 py-0.5 rounded-full border border-current/20 opacity-70">
              {count} lafal
            </span>
          )}
        </div>
        {description && <p className="text-sm mt-0.5 leading-relaxed opacity-80">{description}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */

export default function DoaPage() {
  return (
    <div className="space-y-12">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 rounded-3xl p-8 sm:p-10 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-white/20">
            <BookOpen className="w-3.5 h-3.5" />
            Panduan Ibadah
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
            Niat &amp; Doa Zakat
          </h1>
          <p className="text-green-100 text-sm leading-relaxed max-w-lg mb-6">
            Kumpulan lafal niat zakat fitrah dan fidyah lengkap beserta tulisan Arab, latin, dan terjemahannya.
            Niat cukup di dalam hati, namun melafalkannya dianjurkan untuk memantapkan hati.
          </p>

          {/* Quick jump pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { href: "#zakat-fitrah", label: "🤲 Zakat Fitrah", count: 6 },
              { href: "#penerima",     label: "💚 Doa Penerima", count: 1 },
              { href: "#fidyah",       label: "📿 Fidyah",       count: 3 },
            ].map(({ href, label, count }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                {label}
                <span className="bg-white/20 text-white/80 text-xs px-1.5 py-0.5 rounded-full leading-none">{count}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick info cards ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: "🕌", label: "Zakat Fitrah", sub: "6 lafal niat", href: "#zakat-fitrah" },
          { emoji: "💚", label: "Doa Penerima", sub: "1 doa mustahik", href: "#penerima" },
          { emoji: "📿", label: "Niat Fidyah",  sub: "3 lafal niat", href: "#fidyah" },
        ].map(({ emoji, label, sub, href }) => (
          <a
            key={label}
            href={href}
            className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <p className="text-2xl mb-2">{emoji}</p>
            <p className="text-xs font-bold text-gray-800 group-hover:text-green-700 transition-colors">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </a>
        ))}
      </div>

      {/* ── Zakat Fitrah ── */}
      <section className="space-y-4">
        <SectionHeader
          id="zakat-fitrah"
          icon={HandCoins}
          color="green"
          count={6}
          title="Niat Zakat Fitrah"
          description="Lafal niat zakat fitrah untuk berbagai kondisi. Sumber: NU Online — Lafal-lafal Niat Zakat Fitrah."
        />
        {ZAKAT_FITRAH.map((item, i) => (
          <DoaCard key={i} {...item} index={i} accentColor="green" />
        ))}
      </section>

      {/* ── Doa Penerima ── */}
      <section className="space-y-4">
        <SectionHeader
          id="penerima"
          icon={Heart}
          color="amber"
          title="Doa Penerima Zakat"
          description="Doa yang dianjurkan bagi penerima zakat (mustahik) untuk mendoakan pemberi zakat."
        />
        {DOA_PENERIMA.map((item, i) => (
          <DoaCard key={i} {...item} accentColor="amber" />
        ))}
      </section>

      {/* ── Fidyah ── */}
      <section className="space-y-4">
        <SectionHeader
          id="fidyah"
          icon={BookOpen}
          color="teal"
          count={3}
          title="Niat Fidyah"
          description="Lafal niat fidyah bagi yang tidak mampu berpuasa karena uzur syar'i seperti sakit, usia tua, atau hamil."
        />
        {FIDYAH.map((item, i) => (
          <DoaCard key={i} {...item} index={i} accentColor="teal" />
        ))}
      </section>

      {/* ── Info footer ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3 text-sm text-gray-600">
        <p className="font-semibold text-gray-800">📖 Catatan</p>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Niat zakat wajib diucapkan dalam hati; melafalkannya sunnah untuk memantapkan niat.</li>
          <li>Zakat fitrah dibayarkan paling lambat sebelum shalat Idul Fitri.</li>
          <li>Fidyah dibayarkan kepada fakir miskin; satu hari puasa yang ditinggalkan untuk satu orang miskin.</li>
          <li>
            Sumber rujukan:{" "}
            <a
              href="https://www.nu.or.id/nasional/lafal-niat-zakat-fitrah-lengkap-arab-latin-dan-terjemahannya-3H2Nf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline hover:text-green-800"
            >
              NU Online — Lafal-lafal Niat Zakat Fitrah
            </a>
          </li>
        </ul>
      </div>

      {/* ── CTA: Kalkulator ── */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">Fitur Terkait</p>
        <h3 className="text-base font-bold text-gray-900 mb-1">Hitung Zakat &amp; Fidyah Kamu</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Gunakan kalkulator untuk mengetahui jumlah zakat fitrah yang wajib kamu bayarkan atau total fidyah pengganti puasa.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/calculator/zakat-fitrah"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm shadow"
          >
            🌾 Kalkulator Zakat Fitrah
          </Link>
          <Link
            href="/calculator/fidyah"
            className="inline-flex items-center justify-center gap-2 bg-white border border-amber-200 hover:border-amber-400 text-amber-700 font-semibold px-5 py-2.5 rounded-xl transition text-sm"
          >
            📅 Kalkulator Fidyah
          </Link>
          <Link
            href="/docs/doa"
            className="inline-flex items-center justify-center gap-2 bg-white border border-green-200 hover:border-green-400 text-green-700 font-semibold px-5 py-2.5 rounded-xl transition text-sm"
          >
            <BookOpen className="w-4 h-4" /> Panduan Lengkap
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
