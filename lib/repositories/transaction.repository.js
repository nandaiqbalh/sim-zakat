// lib/repositories/transaction.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

function serializeTx(tx) {
  return { ...tx, amount: Number(tx.amount) };
}

export async function createTransaction({
  mosqueId, muzakkiId, assetType, amount, createdById, note,
}) {
  try {
    const tx = await prisma.zakatTransaction.create({
      data: { mosqueId, muzakkiId, assetType, amount, createdById, note: note || null },
      include: {
        muzakki: true,
        createdBy: { select: { id: true, name: true, email: true } },
      },
    });
    return new GeneralResponse(true, "Transaksi berhasil dicatat.", serializeTx(tx));
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function getTransactionsByMosque({ mosqueId, page = 1, limit = 20 }) {
  try {
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
      prisma.zakatTransaction.findMany({
        where: { mosqueId },
        include: {
          muzakki: true,
          createdBy: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.zakatTransaction.count({ where: { mosqueId } }),
    ]);
    return new GeneralResponse(true, "Berhasil.", {
      transactions: transactions.map(serializeTx),
      total,
      page,
      limit,
    });
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function getZakatBalance(mosqueId) {
  try {
    const [cashIn, riceIn] = await Promise.all([
      prisma.zakatTransaction.aggregate({
        where: { mosqueId, assetType: "CASH" },
        _sum: { amount: true },
      }),
      prisma.zakatTransaction.aggregate({
        where: { mosqueId, assetType: "RICE" },
        _sum: { amount: true },
      }),
    ]);

    const conversions = await prisma.assetConversion.findMany({
      where: { mosqueId },
      select: { fromAmount: true, toAmount: true },
    });

    let cashConverted = 0;
    let riceFromConversion = 0;
    for (const c of conversions) {
      cashConverted += Number(c.fromAmount);
      riceFromConversion += Number(c.toAmount);
    }

    const [cashOut, riceOut] = await Promise.all([
      prisma.distributionItem.aggregate({
        where: { program: { mosqueId }, assetType: "CASH", status: "DISTRIBUTED" },
        _sum: { amount: true },
      }),
      prisma.distributionItem.aggregate({
        where: { program: { mosqueId }, assetType: "RICE", status: "DISTRIBUTED" },
        _sum: { amount: true },
      }),
    ]);

    const cashInN = Number(cashIn._sum.amount || 0);
    const riceInN = Number(riceIn._sum.amount || 0);
    const cashOutN = Number(cashOut._sum.amount || 0);
    const riceOutN = Number(riceOut._sum.amount || 0);

    return new GeneralResponse(true, "Berhasil.", {
      cashIn: cashInN,
      riceIn: riceInN,
      cashConverted,
      riceFromConversion,
      cashOut: cashOutN,
      riceOut: riceOutN,
      cashBalance: cashInN - cashConverted - cashOutN,
      riceBalance: riceInN + riceFromConversion - riceOutN,
    });
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}
