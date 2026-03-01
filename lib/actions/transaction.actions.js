// lib/actions/transaction.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import {
  recordTransaction,
  listTransactions,
  getBalance,
} from "@/lib/services/transaction.service";

async function requireMosque(userId) {
  const res = await findMosqueByUserId(userId);
  if (!res.success || !res.data) {
    return { ok: false, message: "Data masjid tidak ditemukan. Silakan atur data masjid Anda terlebih dahulu." };
  }
  return { ok: true, mosque: res.data };
}

export async function recordTransactionAction(formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message };

  return recordTransaction(mosqueCheck.mosque.id, sessionRes.data.userId, formData);
}

export async function listTransactionsAction(page = 1) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message, data: null };

  return listTransactions(mosqueCheck.mosque.id, page);
}

export async function getBalanceAction() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message, data: null };

  return getBalance(mosqueCheck.mosque.id);
}
