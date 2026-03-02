# SIM Zakat — Sistem Informasi Manajemen Zakat

Platform digital terintegrasi untuk pengelolaan zakat masjid secara akuntabel, transparan, dan terstruktur.

🌐 **Live App:** [sim-zakat.nandaiqbalh.com](https://sim-zakat.nandaiqbalh.com)  
📖 **Panduan Penggunaan:** [sim-zakat.nandaiqbalh.com/docs](https://sim-zakat.nandaiqbalh.com/docs)  
🧮 **Kalkulator Zakat:** [sim-zakat.nandaiqbalh.com/calculator](https://sim-zakat.nandaiqbalh.com/calculator/zakat-fitrah)

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🕌 Manajemen Masjid | Daftarkan masjid dan atur staf (Manager & Distributor) |
| ⬇️ Penerimaan Zakat | Catat transaksi zakat fitrah, maal, infaq, dan sedekah |
| 👥 Data Mustahik | Kelola 8 asnaf penerima zakat beserta wilayah dan status aktif |
| 🔄 Konversi Aset | Konversi beras ke uang sesuai harga pasar setempat |
| 📦 Program Distribusi | Buat program dan distribusikan zakat langsung ke mustahik |
| 📊 Dashboard & Laporan | Pantau saldo, statistik, dan riwayat distribusi |
| 🧮 Kalkulator Zakat | Hitung zakat fitrah & fidyah (publik, tanpa login) |
| 📖 Dokumentasi | Panduan penggunaan lengkap dalam aplikasi |

---

## 🏗️ Arsitektur

Proyek ini menggunakan pendekatan layered architecture:

```
├── lib/
│   ├── repositories/   # Akses database via Prisma (query layer)
│   ├── services/       # Business logic & aturan aplikasi
│   ├── actions/        # Server Actions — jembatan UI ↔ service
│   └── validations/    # Validasi input dengan Zod
```

Ketiga layer ini **independen dari UI** — komponen dapat diganti tanpa menyentuh logika bisnis.

---

## 📁 Struktur Proyek

```
app/
  (auth)/              # Login & Register
  admin/               # Halaman admin (dashboard, masjid, transaksi, dll.)
  calculator/          # Kalkulator zakat fitrah & fidyah (publik)
  docs/                # Dokumentasi penggunaan (publik)
  api/                 # API routes (NextAuth, dll.)
components/
  admin/               # Navigasi sidebar admin
  auth/                # Form login & register
  calculator/          # Komponen kalkulator interaktif
  docs/                # Sidebar & section dokumentasi
  mustahik/            # CRUD mustahik
  programs/            # Program distribusi & form distribusi
  transactions/        # Transaksi masuk
  zakat/               # Design system (ZakatButton, ZakatCard, dst.)
  ui/                  # Base components (dialog, badge, pagination, dst.)
lib/                   # Actions, services, repositories, validations, utils
prisma/                # Schema & migrasi database
docker/                # Dockerfile & konfigurasi nginx/postgres
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js 18+
- PostgreSQL
- npm / yarn / pnpm

### Environment Variables

Buat file `.env` di root proyek:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sim_zakat"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Pengembangan Lokal

```bash
# 1. Install dependensi
npm install

# 2. Jalankan migrasi database
npx prisma migrate dev
npx prisma generate

# 3. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🐳 Menggunakan Docker

### Mode Development

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Mode Production

```bash
docker compose -f docker-compose.prod.yml up -d
```

Aplikasi akan berjalan di `http://localhost:3000`.  
Untuk menjalankan migrasi di dalam container:

```bash
docker compose exec app npx prisma migrate dev
```

---

## 📖 Panduan Penggunaan

Dokumentasi lengkap tersedia di dalam aplikasi: [/docs](https://sim-zakat.nandaiqbalh.com/docs)

| # | Topik |
|---|---|
| 1 | Login & Daftar |
| 2 | Setup Masjid & Staf |
| 3 | Catat Transaksi Masuk |
| 4 | Konversi Aset |
| 5 | Setup Data Mustahik |
| 6 | Program Distribusi |
| 7 | Alur Kerja Distributor |
| 8 | Ganti Profil |
| 9 | Kalkulator Zakat & Fidyah |
| 10 | Kontribusi |

---

## 🧮 Kalkulator Zakat (Publik)

Tersedia tanpa login di `/calculator`:

- **Zakat Fitrah** — hitung untuk N jiwa, pilih bayar beras atau uang, sesuaikan harga per kg
- **Fidyah** — hitung untuk N orang × N hari, pilih alasan (sakit, lansia, hamil, musafir)

Berdasarkan ketentuan **Kemenag RI**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Validasi:** Zod
- **Deployment:** Docker + Nginx

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Silakan:

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin fitur/nama-fitur`)
5. Buka Pull Request

Laporkan bug atau ide fitur melalui [GitHub Issues](https://github.com/nandaiqbalh/sim-zakat/issues).

---

## 📄 Lisensi

MIT License — bebas digunakan, dimodifikasi, dan didistribusikan.

---

> Dibuat dengan ❤️ untuk masjid-masjid di Indonesia. Semoga bermanfaat.
