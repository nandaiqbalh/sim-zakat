// app/docs/[slug]/page.jsx
import { notFound } from "next/navigation";
import { DOC_SECTIONS } from "@/lib/docs";
import LoginRegisterSection from "@/components/docs/sections/LoginRegisterSection";
import SetupMasjidSection from "@/components/docs/sections/SetupMasjidSection";
import TransaksiSection from "@/components/docs/sections/TransaksiSection";
import KonversiSection from "@/components/docs/sections/KonversiSection";
import MuzakkiSection from "@/components/docs/sections/MuzakkiSection";
import ProgramSection from "@/components/docs/sections/ProgramSection";
import DistribusiSection from "@/components/docs/sections/DistribusiSection";
import ProfileSection from "@/components/docs/sections/ProfileSection";
import KalkulatorSection from "@/components/docs/sections/KalkulatorSection";
import KontribusiSection from "@/components/docs/sections/KontribusiSection";
import DocsPageNav from "@/components/docs/DocsPageNav";

const SECTION_MAP = {
  "login-register":     <LoginRegisterSection />,
  "setup-masjid":       <SetupMasjidSection />,
  "transaksi":          <TransaksiSection />,
  "konversi":           <KonversiSection />,
  "muzakki":            <MuzakkiSection />,
  "program-distribusi": <ProgramSection />,
  "distribusi":         <DistribusiSection />,
  "profile":            <ProfileSection />,
  "kalkulator":         <KalkulatorSection />,
  "kontribusi":         <KontribusiSection />,
};

export async function generateStaticParams() {
  return DOC_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const section = DOC_SECTIONS.find((s) => s.slug === resolvedParams.slug);
  if (!section) return {};
  return {
    title: `${section.label} — Panduan SIM Zakat`,
    description: `Panduan penggunaan SIM Zakat: ${section.label}`,
  };
}

export default async function DocsSlugPage({ params }) {
  const resolvedParams = await params;
  const content = SECTION_MAP[resolvedParams.slug];
  if (!content) notFound();

  const currentIndex = DOC_SECTIONS.findIndex((s) => s.slug === resolvedParams.slug);
  const rawPrev = currentIndex > 0 ? DOC_SECTIONS[currentIndex - 1] : null;
  const rawNext = currentIndex < DOC_SECTIONS.length - 1 ? DOC_SECTIONS[currentIndex + 1] : null;

  // only send serializable props to client
  const prev = rawPrev ? { slug: rawPrev.slug, label: rawPrev.label } : null;
  const next = rawNext ? { slug: rawNext.slug, label: rawNext.label } : null;

  return (
    <div>
      {content}
      <DocsPageNav prev={prev} next={next} />
    </div>
  );
}
