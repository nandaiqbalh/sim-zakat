// lib/services/conversion.service.js
import {
  createConversion,
  getConversionsByMosque,
} from "@/lib/repositories/conversion.repository";
import { conversionSchema, flattenZodErrors } from "@/lib/validations/conversion.schema";

/**
 * Convert cash (IDR) → rice (kg).
 * toAmount = fromAmount / rate (rate = price per kg).
 */
export async function convertAsset(mosqueId, userId, payload) {
  const parsed = conversionSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }

  const { rate, fromAmount } = parsed.data;
  const toAmount = parseFloat((fromAmount / rate).toFixed(3));

  const res = await createConversion({
    mosqueId,
    fromAsset: "CASH",
    toAsset: "RICE",
    fromAmount,
    toAmount,
    rate,
    createdById: userId,
  });

  return { success: res.success, message: res.message, data: res.data };
}

export async function listConversions(mosqueId) {
  return getConversionsByMosque(mosqueId);
}
