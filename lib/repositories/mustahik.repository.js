// lib/repositories/mustahik.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

export async function createMustahik({ mosqueId, name, address, phone, category, isActive = true, wilayahId = null }) {
  try {
    const mustahik = await prisma.mustahik.create({
      data: {
        mosqueId,
        name: name.trim(),
        address: address?.trim() || null,
        phone: phone?.trim() || null,
        category,
        isActive,
            wilayahId,
      },
        include: { wilayah: true },
    });
    return new GeneralResponse(true, "Mustahik berhasil ditambahkan.", mustahik);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function getMustahikByMosque({ mosqueId, onlyActive = false }) {
  try {
    const mustahiks = await prisma.mustahik.findMany({
      where: { mosqueId, ...(onlyActive ? { isActive: true } : {}) },
        include: { wilayah: true },
      orderBy: { name: "asc" },
    });
    return new GeneralResponse(true, "Berhasil.", mustahiks);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function findMustahikById(id) {
  try {
      const mustahik = await prisma.mustahik.findUnique({
          where: { id },
          include: { wilayah: true },
      });
    if (!mustahik) return new GeneralResponse(false, "Mustahik tidak ditemukan.", null);
    return new GeneralResponse(true, "Berhasil.", mustahik);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function updateMustahik(id, data) {
  try {
      const mustahik = await prisma.mustahik.update({
          where: { id },
          data,
          include: { wilayah: true },
      });
    return new GeneralResponse(true, "Mustahik berhasil diperbarui.", mustahik);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function deleteMustahik(id) {
  try {
    await prisma.mustahik.delete({ where: { id } });
    return new GeneralResponse(true, "Mustahik berhasil dihapus.", null);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}
