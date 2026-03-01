// lib/services/dashboard.service.js
import prisma from "@/lib/prisma";
import { getZakatBalance } from "@/lib/repositories/transaction.repository";
import { GeneralResponse } from "@/lib/model/response";

export async function getDashboardStats(mosqueId) {
  const balanceRes = await getZakatBalance(mosqueId);
  if (!balanceRes.success) return balanceRes;

  const [
    pendingCount,
    distributedCount,
    totalMuzakki,
    totalMustahik,
    totalTransactions,
  ] = await Promise.all([
    prisma.distributionItem.count({ where: { program: { mosqueId }, status: "PENDING" } }),
    prisma.distributionItem.count({ where: { program: { mosqueId }, status: "DISTRIBUTED" } }),
    prisma.muzakki.count({ where: { mosqueId } }),
    prisma.mustahik.count({ where: { mosqueId, isActive: true } }),
    prisma.zakatTransaction.count({ where: { mosqueId } }),
  ]);

  return new GeneralResponse(true, "Berhasil.", {
    ...balanceRes.data,
    pendingDistributions: pendingCount,
    completedDistributions: distributedCount,
    totalMuzakki,
    totalMustahik,
    totalTransactions,
  });
}
