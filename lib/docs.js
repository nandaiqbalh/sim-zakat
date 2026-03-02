// lib/docs.js

import {
  LogIn,
  Building2,
  ArrowDownToLine,
  RefreshCcw,
  Users,
  Package,
  Truck,
  UserCircle,
  Calculator,
  Github,
} from "lucide-react";

export const DOC_SECTIONS = [
  { slug: "login-register",    label: "Login & Daftar",            icon: LogIn,            step: 1 },
  { slug: "setup-masjid",      label: "Setup Masjid & Staff",       icon: Building2,        step: 2 },
  { slug: "transaksi",         label: "Catat Transaksi Masuk",      icon: ArrowDownToLine,  step: 3 },
  { slug: "konversi",          label: "Konversi Aset",              icon: RefreshCcw,       step: 4 },
  { slug: "muzakki",           label: "Setup Mustahik",             icon: Users,            step: 5 },
  { slug: "program-distribusi",label: "Program Distribusi",         icon: Package,          step: 6 },
  { slug: "distribusi",        label: "Distributor Membagikan",     icon: Truck,            step: 7 },
  { slug: "profile",           label: "Ganti Profil",               icon: UserCircle,       step: 8 },
  { slug: "kalkulator",        label: "Fitur Kalkulator",          icon: Calculator,       step: 9 },
  { slug: "kontribusi",        label: "Kontribusi",                 icon: Github,           step: 10 },
];
