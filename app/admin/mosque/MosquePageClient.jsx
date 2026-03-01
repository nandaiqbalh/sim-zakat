// app/admin/mosque/MosquePageClient.jsx
"use client";

import { useState } from "react";
import StaffList from "@/components/mosque/StaffList";
import AddStaffDialog from "@/components/mosque/AddStaffDialog";

export default function MosquePageClient({ mosque, staff }) {
  const [showAddStaff, setShowAddStaff] = useState(false);

  return (
    <>
      <StaffList staff={staff} onAdd={() => setShowAddStaff(true)} />
      <AddStaffDialog
        open={showAddStaff}
        onClose={() => setShowAddStaff(false)}
        mosqueId={mosque.id}
      />
    </>
  );
}
