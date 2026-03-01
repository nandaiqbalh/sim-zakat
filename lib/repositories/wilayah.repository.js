// lib/repositories/wilayah.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

export async function getWilayahByMosque(mosqueId) {
  try {
    const wilayah = await prisma.wilayah.findMany({
      where: { mosqueId },
      orderBy: { name: "asc" },
    });
    return new GeneralResponse(true, "Berhasil.", wilayah);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

/**
 * Find existing wilayah by (mosqueId, lowercase name) or create a new one.
 */
export async function findOrCreateWilayah(mosqueId, name) {
  const normalized = name.trim().toLowerCase();
  if (!normalized) {
    return new GeneralResponse(false, "Nama wilayah tidak boleh kosong.", null);
  }
  try {
    const wilayah = await prisma.wilayah.upsert({
      where: { mosqueId_name: { mosqueId, name: normalized } },
      update: {},
      create: { mosqueId, name: normalized },
    });
    return new GeneralResponse(true, "Berhasil.", wilayah);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}
