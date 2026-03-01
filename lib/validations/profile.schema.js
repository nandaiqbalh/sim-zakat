import { z } from "zod";

export const nameSchema = z
  .string()
  .min(1, "Nama lengkap wajib diisi.")
  .min(2, "Nama lengkap harus minimal 2 karakter.")
  .max(100, "Nama lengkap tidak boleh lebih dari 100 karakter.")
  .trim();

export const phoneSchema = z
  .string()
  .regex(/^(2|0)[0-9]{8,13}$/, "Format nomor HP tidak valid. Contoh: 081234567890")
  .trim()
  .optional()
  .or(z.literal(""));

export const genderSchema = z.enum(
    ["Male", "Female", "Prefer not to say"],
  { message: "Silakan pilih jenis kelamin yang valid." }
);

export const birthdateSchema = z
  .string()
  .refine(
    (date) => !date || /^\d{4}-\d{2}-\d{2}$/.test(date),
    "Format tanggal tidak valid."
  )
  .refine(
    (date) => {
      if (!date) return true;
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate <= today;
    },
    "Tanggal lahir tidak boleh di masa depan."
  )
  .refine(
    (date) => {
      if (!date) return true;
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 13;
    },
    "Usia minimal 13 tahun."
  )
  .optional()
  .or(z.literal(""));

/**
 * Profile update schema
 * Used in: ProfileForm (client), updateProfileAction (server)
 */
export const profileSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  gender: genderSchema.optional(),
  birthdate: birthdateSchema,
});

/**
 * Helper: flatten Zod errors into a field-keyed object
 */
export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}