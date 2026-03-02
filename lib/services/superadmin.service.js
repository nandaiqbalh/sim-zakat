// lib/services/superadmin.service.js
import {
  getPlatformSummary,
  getAllMosques,
  getTransactionSummaryAllMosques,
  getAllPrograms,
  getAllUsers,
  getRecentActivity,
} from "@/lib/repositories/superadmin.repository";
import { GeneralResponse } from "@/lib/model/response";

/**
 * Dashboard: combines platform summary + recent activity + top mosques
 * (top mosques derived from transaction summary, sorted by txCount)
 */
export async function getDashboardOverview() {
  try {
    const [summaryRes, activityRes, txSummaryRes] = await Promise.all([
      getPlatformSummary(),
      getRecentActivity(),
      getTransactionSummaryAllMosques(),
    ]);

    if (!summaryRes.success) return summaryRes;

    return new GeneralResponse(true, "OK", {
      summary: summaryRes.data,
      recentActivity: activityRes.data ?? [],
      topMosques: (txSummaryRes.data ?? []).slice(0, 5),
    });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

/**
 * Mosques list with pagination and search.
 * @param {{ page?: number, limit?: number, search?: string }} params
 */
export async function getMosqueList({ page = 1, limit = 15, search = "" } = {}) {
  return getAllMosques({ page, limit, search });
}

/**
 * Transaction summary per mosque (full list, already sorted by activity).
 * Also includes platform-level totals derived from the summary.
 */
export async function getTransactionSummary() {
  try {
    const [txRes, summaryRes] = await Promise.all([
      getTransactionSummaryAllMosques(),
      getPlatformSummary(),
    ]);

    if (!txRes.success) return txRes;

    return new GeneralResponse(true, "OK", {
      mosques: txRes.data ?? [],
      platformTotals: {
        totalCash: summaryRes.data?.totalCash ?? 0,
        totalRice: summaryRes.data?.totalRice ?? 0,
        totalMosques: (txRes.data ?? []).length,
      },
    });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

/**
 * Programs list with pagination and optional mosque filter.
 * Also returns the full mosque list for the filter dropdown.
 * @param {{ page?: number, limit?: number, mosqueId?: string }} params
 */
export async function getProgramList({ page = 1, limit = 15, mosqueId = "" } = {}) {
  try {
    const [programsRes, mosquesRes] = await Promise.all([
      getAllPrograms({ page, limit, mosqueId }),
      getAllMosques({ page: 1, limit: 200 }),
    ]);

    if (!programsRes.success) return programsRes;

    return new GeneralResponse(true, "OK", {
      programs: programsRes.data?.programs ?? [],
      total: programsRes.data?.total ?? 0,
      page: programsRes.data?.page ?? page,
      limit: programsRes.data?.limit ?? limit,
      allMosques: mosquesRes.data?.mosques ?? [],
    });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

/**
 * Users list with pagination and search.
 * @param {{ page?: number, limit?: number, search?: string }} params
 */
export async function getUserList({ page = 1, limit = 20, search = "" } = {}) {
  return getAllUsers({ page, limit, search });
}
