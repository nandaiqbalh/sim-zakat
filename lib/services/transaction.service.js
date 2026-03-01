// lib/services/transaction.service.js
import { findOrCreateMuzakki } from "@/lib/repositories/muzakki.repository";
import {
  createTransaction,
  getTransactionsByMosque,
  getZakatBalance,
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

export async function listTransactions(mosqueId, page = 1) {
  return getTransactionsByMosque({ mosqueId, page });
}

export async function getBalance(mosqueId) {
  return getZakatBalance(mosqueId);
}
