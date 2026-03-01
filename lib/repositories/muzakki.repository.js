// lib/repositories/muzakki.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

/**
 * Find an existing muzakki by name (case-insensitive) or create a new one.
 * This is the core "auto-create" logic for the transaction flow.
 */
export async function findOrCreateMuzakki({ mosqueId, name, phone }) {
  try {
    let muzakki = await prisma.muzakki.findFirst({
      where: {
        mosqueId,
        name: { equals: name.trim(), mode: "insensitive" },
      },
    });

    if (!muzakki) {
      muzakki = await prisma.muzakki.create({
        data: {
          mosqueId,
          name: name.trim(),
          phone: phone?.trim() || null,
        },
      });
    }

    return new GeneralResponse(true, "Berhasil.", muzakki);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function searchMuzakki({ mosqueId, query }) {
  try {
    const muzakkis = await prisma.muzakki.findMany({
      where: {
        mosqueId,
        name: { contains: query?.trim() || "", mode: "insensitive" },
      },
      take: 10,
      orderBy: { name: "asc" },
    });
    return new GeneralResponse(true, "Berhasil.", muzakkis);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}
