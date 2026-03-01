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
  password: z
    .string()
    .min(6, "Password minimal 6 karakter."),
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
