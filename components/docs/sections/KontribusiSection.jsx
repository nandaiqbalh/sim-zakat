// components/docs/sections/KontribusiSection.jsx

import Link from "next/link";
import { Github, ExternalLink, CheckCircle2, Package, Heart } from "lucide-react";

const TECH_STACK = [
  { label: "Next.js 14", desc: "App Router, Server Components" },
  { label: "Prisma ORM", desc: "Database access layer" },
  { label: "PostgreSQL", desc: "Relational database" },
  { label: "NextAuth.js", desc: "Authentication" },
  { label: "Tailwind CSS", desc: "Utility-first styling" },
  { label: "Docker", desc: "Containerized deployment" },
];

export default function KontribusiSection() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Langkah 10</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Kontribusi & Open Source</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          SIM Zakat adalah proyek open source yang dikembangkan untuk membantu masjid-masjid di Indonesia
          mengelola zakat secara digital dan transparan. Kontribusi dari komunitas sangat kami sambut!
        </p>
      </div>

      {/* GitHub CTA */}
      <div className="bg-gray-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Github className="w-10 h-10" />
          <div>
            <p className="font-bold text-base">nandaiqbalh / sim-zakat</p>
                      <p className="text-sm text-gray-400 mt-0.5">Open source · Gratis Selamanya</p>
          </div>
        </div>
        <Link
          href="https://github.com/nandaiqbalh/sim-zakat"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors shrink-0"
        >
          <Github className="w-4 h-4" />
          Lihat di GitHub
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cara berkontribusi */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🤝 Cara Berkontribusi</h2>
        <ul className="space-y-2">
          {[
            "Fork repository di GitHub dan buat branch baru",
            "Buat perubahan atau fitur baru yang ingin ditambahkan",
            "Buat Pull Request dengan deskripsi yang jelas",
            "Laporkan bug atau ide fitur melalui GitHub Issues",
            "Bantu dokumentasi dan terjemahan",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech stack */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🛠️ Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TECH_STACK.map((tech) => (
            <div key={tech.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
              <p className="font-semibold text-sm text-gray-800">{tech.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Docker */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">🐳 Tersedia dengan Docker</h2>
        <p className="text-sm text-gray-500 mb-3">
          SIM Zakat dapat dijalankan dengan Docker untuk deployment yang mudah di server manapun.
        </p>
        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
          <code className="text-green-400 text-xs leading-loose whitespace-pre">{`# Clone repository
git clone https://github.com/nandaiqbalh/sim-zakat.git
cd sim-zakat

# Salin file environment
cp .env.example .env

# Jalankan dengan Docker Compose (production)
docker compose -f docker-compose.prod.yml up -d

# Atau mode development
docker compose -f docker-compose.dev.yml up`}</code>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Lihat file <code className="bg-gray-100 px-1 py-0.5 rounded">docker-compose.prod.yml</code> untuk konfigurasi lengkap.
        </p>
      </section>

      {/* Footer thanks */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-start gap-3">
        <Heart className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-800 text-sm">Terima kasih telah menggunakan SIM Zakat!</p>
          <p className="text-xs text-green-600 mt-1 leading-relaxed">
            Semoga aplikasi ini dapat membantu pengelolaan zakat di masjid Anda menjadi lebih transparan,
            akuntabel, dan bermanfaat bagi masyarakat. Jika ada pertanyaan atau saran, silakan buka
            GitHub Issues atau hubungi pengembang.
          </p>
        </div>
      </div>
    </div>
  );
}
