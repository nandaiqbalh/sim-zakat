// lib/actions/wilayah.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getWilayahByMosque } from "@/lib/repositories/wilayah.repository";

export async function getWilayahAction() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message, data: [] };

  const mosqueRes = await findMosqueByUserId(sessionRes.data.userId);
  if (!mosqueRes.success || !mosqueRes.data) {
    return { success: false, message: "Masjid tidak ditemukan.", data: [] };
  }

  return getWilayahByMosque(mosqueRes.data.id);
}
