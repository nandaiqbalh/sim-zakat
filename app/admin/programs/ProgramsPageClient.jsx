// app/admin/programs/ProgramsPageClient.jsx
"use client";

import { useState } from "react";
import ZakatButton from "@/components/zakat/ZakatButton";
import ProgramList from "@/components/programs/ProgramList";
import ProgramFormDialog from "@/components/programs/ProgramFormDialog";

export default function ProgramsPageClient({ programs, role }) {
  const [showCreate, setShowCreate] = useState(false);

  const isManager = role === "MANAGER";

  return (
    <>
      {isManager && (
        <div className="flex justify-end mb-4">
          <ZakatButton onClick={() => setShowCreate(true)}>+ Program Baru</ZakatButton>
        </div>
      )}

      <ProgramList programs={programs} onCreate={isManager ? () => setShowCreate(true) : undefined} />

      {isManager && (
        <ProgramFormDialog
          open={showCreate}
          onClose={() => setShowCreate(false)}
        />
      )}
    </>
  );
}
