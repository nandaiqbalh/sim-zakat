// lib/validations/program.schema.js
import { z } from "zod";

export const programSchema = z.object({
  name: z.string().min(1, "Nama program wajib diisi.").trim(),
});

export const distributionItemSchema = z.object({
  mustahikId: z.string().min(1, "Mustahik wajib dipilih."),
  assetType: z.enum(["CASH", "RICE"], {
    message: "Tipe aset harus CASH atau RICE.",
  }),
  amount: z.coerce
    .number({ invalid_type_error: "Jumlah harus berupa angka." })
    .positive("Jumlah harus lebih besar dari 0."),
});

export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}
