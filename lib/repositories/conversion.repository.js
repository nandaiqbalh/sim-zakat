// lib/repositories/conversion.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

function serialize(c) {
  return {
    ...c,
    fromAmount: Number(c.fromAmount),
    toAmount: Number(c.toAmount),
    rate: Number(c.rate),
  };
}

export async function createConversion({
  mosqueId, fromAsset, toAsset, fromAmount, toAmount, rate, createdById,
}) {
  try {
    const conversion = await prisma.assetConversion.create({
      data: { mosqueId, fromAsset, toAsset, fromAmount, toAmount, rate, createdById },
      include: { createdBy: { select: { id: true, name: true } } },
    });
    return new GeneralResponse(true, "Konversi berhasil disimpan.", serialize(conversion));
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

export async function getConversionsByMosque(mosqueId) {
  try {
    const conversions = await prisma.assetConversion.findMany({
      where: { mosqueId },
      include: { createdBy: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return new GeneralResponse(true, "Berhasil.", conversions.map(serialize));
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}
