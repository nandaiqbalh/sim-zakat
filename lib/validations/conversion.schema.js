// lib/validations/conversion.schema.js
import { z } from "zod";

export const conversionSchema = z.object({
  rate: z.coerce
    .number({ invalid_type_error: "Harga beras harus berupa angka." })
    .positive("Harga beras per kg harus lebih besar dari 0."),
  fromAmount: z.coerce
    .number({ invalid_type_error: "Jumlah harus berupa angka." })
    .positive("Jumlah yang dikonversi harus lebih besar dari 0."),
});

export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}
