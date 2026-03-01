// lib/services/program.service.js
import {
  createProgram,
  getProgramsByMosque,
  getProgramById,
  addDistributionItem,
  markDistributed,
  deleteDistributionItem,
} from "@/lib/repositories/program.repository";
import {
  programSchema,
  distributionItemSchema,
  flattenZodErrors,
} from "@/lib/validations/program.schema";

export async function createDistributionProgram(mosqueId, userId, payload) {
  const parsed = programSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }
  const res = await createProgram({ mosqueId, name: parsed.data.name, createdById: userId });
  return { success: res.success, message: res.message, data: res.data };
}

export async function listPrograms(mosqueId) {
  return getProgramsByMosque(mosqueId);
}

export async function getProgram(id) {
  return getProgramById(id);
}

export async function addItemToProgram(programId, userId, payload) {
  const parsed = distributionItemSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }
  const res = await addDistributionItem({
    programId,
    mustahikId: parsed.data.mustahikId,
    distributorId: userId,
    assetType: parsed.data.assetType,
    amount: parsed.data.amount,
  });
  return { success: res.success, message: res.message, data: res.data };
}

export async function distributeItem(itemId, userId) {
  const res = await markDistributed(itemId, userId);
  return { success: res.success, message: res.message };
}

export async function removeItemFromProgram(itemId) {
  return deleteDistributionItem(itemId);
}
