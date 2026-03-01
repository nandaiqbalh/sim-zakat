// lib/services/mustahik.service.js
import {
  createMustahik,
  getMustahikByMosque,
  updateMustahik,
  deleteMustahik,
  findMustahikById,
} from "@/lib/repositories/mustahik.repository";
import { mustahikSchema, flattenZodErrors } from "@/lib/validations/mustahik.schema";

export async function addMustahik(mosqueId, payload) {
  const parsed = mustahikSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }
  const res = await createMustahik({ mosqueId, ...parsed.data });
  return { success: res.success, message: res.message, data: res.data };
}

export async function listMustahik(mosqueId, onlyActive = false) {
  return getMustahikByMosque({ mosqueId, onlyActive });
}

export async function editMustahik(id, payload) {
  const parsed = mustahikSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }
  const res = await updateMustahik(id, parsed.data);
  return { success: res.success, message: res.message, data: res.data };
}

export async function toggleMustahikStatus(id) {
  const res = await findMustahikById(id);
  if (!res.success || !res.data) return { success: false, message: "Mustahik tidak ditemukan." };
  const updated = await updateMustahik(id, { isActive: !res.data.isActive });
  return {
    success: updated.success,
    message: updated.data?.isActive ? "Mustahik diaktifkan." : "Mustahik dinonaktifkan.",
  };
}

export async function removeMustahik(id) {
  return deleteMustahik(id);
}
