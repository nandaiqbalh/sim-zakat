// lib/repositories/program.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

export async function createProgram({ mosqueId, name, createdById }) {
  try {
    const program = await prisma.distributionProgram.create({
      data: { mosqueId, name: name.trim(), createdById },
    });
    return new GeneralResponse(true, "Program berhasil dibuat.", program);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function getProgramsByMosque(mosqueId) {
  try {
    const programs = await prisma.distributionProgram.findMany({
      where: { mosqueId },
      include: {
        _count: { select: { items: true } },
        createdBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return new GeneralResponse(true, "Berhasil.", programs);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function getProgramById(id) {
  try {
    const program = await prisma.distributionProgram.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            mustahik: true,
            distributor: { select: { id: true, name: true } },
          },
          orderBy: { id: "asc" },
        },
        createdBy: { select: { id: true, name: true } },
      },
    });
    if (!program) return new GeneralResponse(false, "Program tidak ditemukan.", null);
    return new GeneralResponse(true, "Berhasil.", serializeProgram(program));
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function addDistributionItem({
  programId, mustahikId, distributorId, assetType, amount,
}) {
  try {
    const item = await prisma.distributionItem.create({
      data: { programId, mustahikId, distributorId, assetType, amount, status: "PENDING" },
      include: { mustahik: true },
    });
    return new GeneralResponse(true, "Item berhasil ditambahkan.", { ...item, amount: Number(item.amount) });
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function markDistributed(itemId, distributorId) {
  try {
    const item = await prisma.distributionItem.update({
      where: { id: itemId },
      data: { status: "DISTRIBUTED", distributedAt: new Date(), distributorId },
    });
    return new GeneralResponse(true, "Berhasil didistribusikan.", item);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function deleteDistributionItem(itemId) {
  try {
    await prisma.distributionItem.delete({ where: { id: itemId } });
    return new GeneralResponse(true, "Item berhasil dihapus.", null);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

function serializeProgram(program) {
  return {
    ...program,
    items: program.items?.map((item) => ({
      ...item,
      amount: Number(item.amount),
    })),
  };
}
