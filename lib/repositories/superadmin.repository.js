// lib/repositories/superadmin.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

// ── Global platform summary ──────────────────────────────────────────────────

export async function getPlatformSummary() {
  try {
    const [
      totalMosques,
      totalUsers,
      totalMustahik,
      totalMuzakki,
      totalPrograms,
      totalDistributed,
      cashSum,
      riceSum,
    ] = await Promise.all([
      prisma.mosque.count(),
      prisma.user.count(),
      prisma.mustahik.count(),
      prisma.muzakki.count(),
      prisma.distributionProgram.count(),
      prisma.distributionItem.count({ where: { status: "DISTRIBUTED" } }),
      prisma.zakatTransaction.aggregate({ _sum: { amount: true }, where: { assetType: "CASH" } }),
      prisma.zakatTransaction.aggregate({ _sum: { amount: true }, where: { assetType: "RICE" } }),
    ]);

    return new GeneralResponse(true, "OK", {
      totalMosques,
      totalUsers,
      totalMustahik,
      totalMuzakki,
      totalPrograms,
      totalDistributed,
      totalCash: Number(cashSum._sum.amount ?? 0),
      totalRice: Number(riceSum._sum.amount ?? 0),
    });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

// ── Mosque list ──────────────────────────────────────────────────────────────

export async function getAllMosques({ page = 1, limit = 10, search = "" } = {}) {
  try {
    const skip = (page - 1) * limit;
    const where = search
      ? { name: { contains: search.trim(), mode: "insensitive" } }
      : {};

    const [mosques, total] = await Promise.all([
      prisma.mosque.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              users: true,
              mustahik: true,
              muzakki: true,
              zakatIn: true,
              programs: true,
            },
          },
        },
      }),
      prisma.mosque.count({ where }),
    ]);

    return new GeneralResponse(true, "OK", { mosques, total, page, limit, search });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

// ── Transaction summary per mosque ──────────────────────────────────────────

export async function getTransactionSummaryAllMosques() {
  try {
    const rows = await prisma.zakatTransaction.groupBy({
      by: ["mosqueId", "assetType"],
      _sum: { amount: true },
      _count: { id: true },
    });

    // Build map mosqueId -> { CASH, RICE }
    const map = {};
    for (const r of rows) {
      if (!map[r.mosqueId]) map[r.mosqueId] = { cashTotal: 0, riceTotal: 0, txCount: 0 };
      if (r.assetType === "CASH") {
        map[r.mosqueId].cashTotal = Number(r._sum.amount ?? 0);
        map[r.mosqueId].txCount += r._count.id;
      } else {
        map[r.mosqueId].riceTotal = Number(r._sum.amount ?? 0);
        map[r.mosqueId].txCount += r._count.id;
      }
    }

    // Attach mosque names
    const mosqueIds = Object.keys(map);
    const mosques = await prisma.mosque.findMany({
      where: { id: { in: mosqueIds } },
      select: { id: true, name: true, address: true },
    });

    const result = mosques.map((m) => ({
      ...m,
      ...(map[m.id] ?? { cashTotal: 0, riceTotal: 0, txCount: 0 }),
    })).sort((a, b) => b.txCount - a.txCount);

    return new GeneralResponse(true, "OK", result);
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

// ── Programs per mosque ──────────────────────────────────────────────────────

export async function getAllPrograms({ page = 1, limit = 10, mosqueId = "" } = {}) {
  try {
    const skip = (page - 1) * limit;
    const where = mosqueId ? { mosqueId } : {};

    const [programs, total] = await Promise.all([
      prisma.distributionProgram.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          mosque: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
          _count: { select: { items: true } },
          items: {
            select: { status: true, assetType: true, amount: true },
          },
        },
      }),
      prisma.distributionProgram.count({ where }),
    ]);

    const serialized = programs.map((p) => {
      const distributed = p.items.filter((i) => i.status === "DISTRIBUTED").length;
      const pending = p.items.filter((i) => i.status === "PENDING").length;
      const cashOut = p.items.filter((i) => i.assetType === "CASH")
        .reduce((s, i) => s + Number(i.amount), 0);
      const riceOut = p.items.filter((i) => i.assetType === "RICE")
        .reduce((s, i) => s + Number(i.amount), 0);
      const { items: _items, ...rest } = p;
      return { ...rest, distributed, pending, cashOut, riceOut };
    });

    return new GeneralResponse(true, "OK", { programs: serialized, total, page, limit });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

// ── Users list ───────────────────────────────────────────────────────────────

export async function getAllUsers({ page = 1, limit = 10, search = "" } = {}) {
  try {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { name: { contains: search.trim(), mode: "insensitive" } },
            { email: { contains: search.trim(), mode: "insensitive" } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          mosqueRoles: {
            select: {
              role: true,
              mosque: { select: { id: true, name: true } },
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return new GeneralResponse(true, "OK", { users, total, page, limit });
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}

// ── Recent activity (last 20 transactions across all mosques) ─────────────────

export async function getRecentActivity() {
  try {
    const transactions = await prisma.zakatTransaction.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        mosque: { select: { name: true } },
        muzakki: { select: { name: true } },
      },
    });
    return new GeneralResponse(
      true,
      "OK",
      transactions.map((t) => ({ ...t, amount: Number(t.amount) }))
    );
  } catch (e) {
    return new GeneralResponse(false, e.message, null);
  }
}
