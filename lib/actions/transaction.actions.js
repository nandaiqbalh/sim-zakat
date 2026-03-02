// lib/actions/transaction.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import { findMosqueByUserId } from "@/lib/repositories/mosque.repository";
import {
  recordTransaction,
  listTransactions,
  getBalance,
  editTransaction,
  removeTransaction,
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

  const res = await recordTransaction(mosqueCheck.mosque.id, sessionRes.data.userId, formData);
  return { success: res.success, message: res.message, data: res.data ? JSON.parse(JSON.stringify(res.data)) : null };
}

export async function updateTransactionAction(txId, formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message };

  const res = await editTransaction(mosqueCheck.mosque.id, sessionRes.data.userId, txId, formData);
  return { success: res.success, message: res.message, data: res.data ? JSON.parse(JSON.stringify(res.data)) : null };
}

export async function deleteTransactionAction(txId) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message };

  const res = await removeTransaction(mosqueCheck.mosque.id, txId);
  return { success: res.success, message: res.message, data: res.data ? JSON.parse(JSON.stringify(res.data)) : null };
}

export async function listTransactionsAction({ page = 1, search = "", assetType = "" } = {}) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message, data: null };

  const res = await listTransactions(mosqueCheck.mosque.id, page, search, assetType);
  // copy into plain object
  return { success: res.success, message: res.message, data: res.data ? JSON.parse(JSON.stringify(res.data)) : null };
}

export async function getBalanceAction() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };

  const mosqueCheck = await requireMosque(sessionRes.data.userId);
  if (!mosqueCheck.ok) return { success: false, message: mosqueCheck.message, data: null };

  return getBalance(mosqueCheck.mosque.id);
}
