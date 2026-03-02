// lib/validations/mosque.schema.js
import { z } from "zod";

export const mosqueSchema = z.object({
  name: z
    .string()
    .min(1, "Nama masjid wajib diisi.")
    .max(100, "Nama tidak boleh lebih dari 100 karakter.")
    .trim(),
  address: z.string().optional().or(z.literal("")),
});

// Reusable strong password validator used across forms.
export const passwordSchema = z
  .string()
  .min(1, "Password wajib diisi.")
  .min(8, "Password minimal 8 karakter.")
  .regex(/[A-Z]/, "Password harus memiliki huruf kapital.")
  .regex(/[0-9]/, "Password harus memiliki angka.")
  .regex(/[^A-Za-z0-9]/, "Password harus memiliki karakter spesial.");

export const createStaffSchema = z.object({
  name: z
    .string()
    .min(1, "Nama staf wajib diisi.")
    .max(100, "Nama tidak boleh lebih dari 100 karakter.")
    .trim(),
  email: z
    .string()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid.")
    .toLowerCase()
    .trim(),
  password: passwordSchema,
  phone: z
    .string()
    .optional()
    .or(z.literal("")),
  mosqueRole: z.enum(["MANAGER", "DISTRIBUTOR"], {
    message: "Role harus MANAGER atau DISTRIBUTOR.",
  }),
});

// Keep backward-compatible alias
export const addStaffSchema = createStaffSchema;

export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}
