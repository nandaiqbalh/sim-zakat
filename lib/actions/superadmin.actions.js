// lib/actions/superadmin.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { GeneralResponse } from "@/lib/model/response";
import {
  getDashboardOverview,
  getMosqueList,
  getTransactionSummary,
  getProgramList,
  getUserList,
} from "@/lib/services/superadmin.service";

/**
 * Validates that the caller is an authenticated SUPERADMIN.
 * @returns {{ ok: true } | { ok: false, message: string }}
 */
async function requireSuperAdmin() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { ok: false, message: sessionRes.message };
  if (sessionRes.data.user?.role !== "SUPERADMIN") {
    return { ok: false, message: "Akses ditolak. Hanya SUPERADMIN yang diizinkan." };
  }
  return { ok: true };
}

/** Safely serialize Prisma data to plain objects */
const serialize = (data) => (data ? JSON.parse(JSON.stringify(data)) : null);

// ─────────────────────────────────────────────────────────────────────────────

export async function getDashboardOverviewAction() {
  const check = await requireSuperAdmin();
  if (!check.ok) return new GeneralResponse(false, check.message, null);

  const res = await getDashboardOverview();
  return { ...res, data: serialize(res.data) };
}

export async function getMosqueListAction({ page = 1, limit = 15, search = "" } = {}) {
  const check = await requireSuperAdmin();
  if (!check.ok) return new GeneralResponse(false, check.message, null);

  const res = await getMosqueList({ page, limit, search });
  return { ...res, data: serialize(res.data) };
}

export async function getTransactionSummaryAction() {
  const check = await requireSuperAdmin();
  if (!check.ok) return new GeneralResponse(false, check.message, null);

  const res = await getTransactionSummary();
  return { ...res, data: serialize(res.data) };
}

export async function getProgramListAction({ page = 1, limit = 15, mosqueId = "" } = {}) {
  const check = await requireSuperAdmin();
  if (!check.ok) return new GeneralResponse(false, check.message, null);

  const res = await getProgramList({ page, limit, mosqueId });
  return { ...res, data: serialize(res.data) };
}

export async function getUserListAction({ page = 1, limit = 20, search = "" } = {}) {
  const check = await requireSuperAdmin();
  if (!check.ok) return new GeneralResponse(false, check.message, null);

  const res = await getUserList({ page, limit, search });
  return { ...res, data: serialize(res.data) };
}
