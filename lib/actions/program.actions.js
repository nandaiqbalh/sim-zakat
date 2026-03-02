// lib/actions/program.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import {
  createDistributionProgram,
  listPrograms,
  getProgram,
  addItemToProgram,
  distributeItem,
  removeItemFromProgram,
} from "@/lib/services/program.service";

async function requireMosque(userId) {
  const res = await findMosqueByUserId(userId);
  if (!res.success || !res.data) {
    return { ok: false, message: "Data masjid tidak ditemukan. Silakan atur data masjid Anda terlebih dahulu." };
  }
  return { ok: true, mosque: res.data };
}

export async function createProgramAction(formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message };

  return createDistributionProgram(mosqueCheck.mosque.id, sessionRes.data.userId, formData);
}

export async function listProgramsAction() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message, data: null };

  return listPrograms(mosqueCheck.mosque.id);
}

export async function getProgramAction(id) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return getProgram(id);
}

export async function addDistributionItemAction(programId, formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return addItemToProgram(programId, sessionRes.data.userId, formData);
}

export async function distributeItemAction(itemId) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return distributeItem(itemId, sessionRes.data.userId);
}

export async function removeDistributionItemAction(itemId) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  const res = await removeItemFromProgram(itemId);
  return { success: res.success, message: res.message, data: res.data ? JSON.parse(JSON.stringify(res.data)) : null };
}
