// lib/services/transaction.service.js
import { findOrCreateMuzakki } from "@/lib/repositories/muzakki.repository";
import {
  createTransaction,
  getTransactionsByMosque,
  getZakatBalance,
  updateTransaction,
  deleteTransaction,
} from "@/lib/repositories/transaction.repository";
import { transactionSchema, flattenZodErrors } from "@/lib/validations/transaction.schema";

/**
 * Record a new zakat-in transaction.
 * Auto-creates the muzakki if they don't exist.
 */
export async function recordTransaction(mosqueId, userId, payload) {
  const parsed = transactionSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }

  const { muzakkiName, assetType, amount, note } = parsed.data;

  const muzakkiRes = await findOrCreateMuzakki({ mosqueId, name: muzakkiName });
  if (!muzakkiRes.success) return { success: false, message: muzakkiRes.message };

  const txRes = await createTransaction({
    mosqueId,
    muzakkiId: muzakkiRes.data.id,
    assetType,
    amount,
    createdById: userId,
    note,
  });

  return { success: txRes.success, message: txRes.message, data: txRes.data };
}

export async function editTransaction(mosqueId, userId, txId, payload) {
  const parsed = transactionSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }

  const { assetType, amount, note } = parsed.data;
  const txRes = await updateTransaction(txId, mosqueId, { assetType, amount, note });
  return { success: txRes.success, message: txRes.message, data: txRes.data };
}

export async function listTransactions(mosqueId, page = 1, search = "", assetType = "") {
  // proxy to the repository, forwarding the same parameters
  return getTransactionsByMosque({ mosqueId, page, limit: 10, search, assetType });
}

// alias for zakat balance retrieval used by actions
export async function getBalance(mosqueId) {
  return getZakatBalance(mosqueId);
}

export async function removeTransaction(mosqueId, txId) {
  return deleteTransaction(txId, mosqueId);
}