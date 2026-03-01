// lib/validations/mustahik.schema.js
import { z } from "zod";

export const mustahikSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi.").trim(),
  address: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  category: z.enum(
    ["FAKIR", "MISKIN", "AMIL", "MUALAF", "GHARIM", "FISABILILLAH", "IBNU_SABIL"],
    { message: "Kategori tidak valid." }
  ),
  isActive: z.boolean().optional().default(true),
});

export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}
