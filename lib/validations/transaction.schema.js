// lib/validations/transaction.schema.js
import { z } from "zod";

export const transactionSchema = z.object({
  muzakkiName: z.string().min(1, "Nama muzakki wajib diisi.").trim(),
  assetType: z.enum(["CASH", "RICE"], {
    message: "Tipe aset harus CASH atau RICE.",
  }),
  amount: z.coerce
    .number({ invalid_type_error: "Jumlah harus berupa angka." })
    .positive("Jumlah harus lebih besar dari 0."),
  note: z.string().optional().or(z.literal("")),
});

export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}
