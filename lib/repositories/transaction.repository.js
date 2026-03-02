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

export async function getTransactionsByMosque({ mosqueId, page = 1, limit = 20, search = "", assetType = "" }) {
  try {
    const skip = (page - 1) * limit;
    // base where
    const baseWhere = { mosqueId };
    if (search) {
      baseWhere.muzakki = { name: { contains: search, mode: "insensitive" } };
    }
    if (assetType) {
      baseWhere.assetType = assetType;
    }

    const [transactions, total] = await Promise.all([
      prisma.zakatTransaction.findMany({
        where: baseWhere,
        include: {
          muzakki: true,
          createdBy: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.zakatTransaction.count({ where: baseWhere }),
    ]);
    return new GeneralResponse(true, "Berhasil.", {
      transactions: transactions.map(serializeTx),
      total,
      page,
      limit,
      search,
      assetType,
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

      const [cashOut, riceOut, cashPending, ricePending] = await Promise.all([
      prisma.distributionItem.aggregate({
        where: { program: { mosqueId }, assetType: "CASH", status: "DISTRIBUTED" },
        _sum: { amount: true },
      }),
      prisma.distributionItem.aggregate({
        where: { program: { mosqueId }, assetType: "RICE", status: "DISTRIBUTED" },
        _sum: { amount: true },
      }),
        prisma.distributionItem.aggregate({
            where: { program: { mosqueId }, assetType: "CASH", status: "PENDING" },
            _sum: { amount: true },
        }),
        prisma.distributionItem.aggregate({
            where: { program: { mosqueId }, assetType: "RICE", status: "PENDING" },
            _sum: { amount: true },
        }),
    ]);

      const cashInN = Number(cashIn._sum.amount || 0);
      const riceInN = Number(riceIn._sum.amount || 0);
      const cashOutN = Number(cashOut._sum.amount || 0);
      const riceOutN = Number(riceOut._sum.amount || 0);
      const cashPendingN = Number(cashPending._sum.amount || 0);
      const ricePendingN = Number(ricePending._sum.amount || 0);

      const cashBalance = cashInN - cashConverted - cashOutN;
      const riceBalance = riceInN + riceFromConversion - riceOutN;

    return new GeneralResponse(true, "Berhasil.", {
      cashIn: cashInN,
      riceIn: riceInN,
      cashConverted,
      riceFromConversion,
      cashOut: cashOutN,
      riceOut: riceOutN,
        cashBalance,
        riceBalance,
        // Dialokasikan (pending di semua program)
        cashPending: cashPendingN,
        ricePending: ricePendingN,
        // Benar-benar tersedia (belum dialokasikan ke program manapun)
        cashAvailable: cashBalance - cashPendingN,
        riceAvailable: riceBalance - ricePendingN,
    });
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

// Update existing transaction (verify mosque ownership)
export async function updateTransaction(txId, mosqueId, data) {
  try {
    const existing = await prisma.zakatTransaction.findUnique({ where: { id: txId } });
    if (!existing || existing.mosqueId !== mosqueId) {
      return new GeneralResponse(false, "Transaksi tidak ditemukan atau tidak boleh diubah.", null);
    }
    const tx = await prisma.zakatTransaction.update({
      where: { id: txId },
      data: {
        assetType: data.assetType,
        amount: data.amount,
        note: data.note || null,
      },
      include: {
        muzakki: true,
        createdBy: { select: { id: true, name: true, email: true } },
      },
    });
    return new GeneralResponse(true, "Transaksi berhasil diperbarui.", serializeTx(tx));
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

// Delete transaction (verify mosque ownership)
export async function deleteTransaction(txId, mosqueId) {
  try {
    const existing = await prisma.zakatTransaction.findUnique({ where: { id: txId } });
    if (!existing || existing.mosqueId !== mosqueId) {
      return new GeneralResponse(false, "Transaksi tidak ditemukan atau tidak boleh dihapus.", null);
    }
    await prisma.zakatTransaction.delete({ where: { id: txId } });
    return new GeneralResponse(true, "Transaksi berhasil dihapus.", null);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}
