// lib/actions/mustahik.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import {
  addMustahik,
  listMustahik,
  editMustahik,
  toggleMustahikStatus,
  removeMustahik,
} from "@/lib/services/mustahik.service";

async function requireMosque(userId) {
  const res = await findMosqueByUserId(userId);
  if (!res.success || !res.data) {
    return { ok: false, message: "Data masjid tidak ditemukan. Silakan atur data masjid Anda terlebih dahulu." };
  }
  return { ok: true, mosque: res.data };
}

export async function addMustahikAction(formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message };

  return addMustahik(mosqueCheck.mosque.id, formData);
}

export async function listMustahikAction({ onlyActive = false, page = 1, limit = 10, wilayah = "", name = "", category = "" } = {}) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message, data: null };

  const res = await listMustahik(
    mosqueCheck.mosque.id,
    onlyActive,
    page,
    limit,
    wilayah,
    name,
    category
  );
  return { success: res.success, message: res.message, data: res.data ? JSON.parse(JSON.stringify(res.data)) : null };
}

export async function editMustahikAction(id, formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message };

  return editMustahik(id, mosqueCheck.mosque.id, formData);
}

export async function toggleMustahikAction(id) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return toggleMustahikStatus(id);
}

export async function removeMustahikAction(id) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return removeMustahik(id);
}
