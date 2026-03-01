// lib/actions/dashboard.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import { getDashboardStats } from "@/lib/services/dashboard.service";

export async function getDashboardStatsAction() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueRes = await findMosqueByUserId(sessionRes.data.userId);
  if (!mosqueRes.success || !mosqueRes.data) {
    return { success: false, message: "Data masjid tidak ditemukan.", data: null };
  }

  return getDashboardStats(mosqueRes.data.id);
}
