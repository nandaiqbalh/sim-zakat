// app/admin/programs/ProgramsPageClient.jsx
"use client";

import { useState } from "react";
import ZakatButton from "@/components/zakat/ZakatButton";
import ProgramList from "@/components/programs/ProgramList";
import ProgramFormDialog from "@/components/programs/ProgramFormDialog";

export default function ProgramsPageClient({ programs }) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <ZakatButton onClick={() => setShowCreate(true)}>+ New Program</ZakatButton>
      </div>

      <ProgramList programs={programs} onCreate={() => setShowCreate(true)} />

      <ProgramFormDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </>
  );
}
