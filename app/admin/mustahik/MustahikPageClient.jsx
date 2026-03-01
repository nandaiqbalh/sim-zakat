// app/admin/mustahik/MustahikPageClient.jsx
"use client";

import { useState } from "react";
import ZakatButton from "@/components/zakat/ZakatButton";
import MustahikTable from "@/components/mustahik/MustahikTable";
import MustahikFormDialog from "@/components/mustahik/MustahikFormDialog";

export default function MustahikPageClient({ mustahik }) {
  const [dialog, setDialog] = useState({ open: false, mustahik: null });

  return (
    <>
      <div className="flex justify-end mb-4">
        <ZakatButton onClick={() => setDialog({ open: true, mustahik: null })}>
          + Add Mustahik
        </ZakatButton>
      </div>

      <MustahikTable
        mustahik={mustahik}
        onEdit={(m) => setDialog({ open: true, mustahik: m })}
      />

      <MustahikFormDialog
        open={dialog.open}
        mustahik={dialog.mustahik}
        onClose={() => setDialog({ open: false, mustahik: null })}
      />
    </>
  );
}
