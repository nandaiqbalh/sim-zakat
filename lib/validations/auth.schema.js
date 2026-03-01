import { z } from "zod";

// ── Reusable field schemas ──────────────────────────────────────────────────

export const nameSchema = z
  .string()
  .min(1, "Nama lengkap wajib diisi.")
  .trim();

export const phoneSchema = z
  .string()
  .regex(/^(2|0)[0-9]{8,13}$/, "Format nomor HP tidak valid. Contoh: 081234567890")
  .trim();

export const emailSchema = z
  .string()
  .min(1, "Email wajib diisi.")
  .email("Format email tidak valid.")
  .trim()
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(1, "Password wajib diisi.")
  .min(8, "Password minimal 8 karakter.")
  .regex(/[A-Z]/, "Password harus memiliki huruf kapital.")
  .regex(/[0-9]/, "Password harus memiliki angka.")
  .regex(/[^A-Za-z0-9]/, "Password harus memiliki karakter spesial.");

export const confirmPasswordSchema = z.string().min(1, "Konfirmasi password wajib diisi.");

// ── Composite schemas ───────────────────────────────────────────────────────

/**
 * Used in: RegisterForm (client), registerAction (server), registerUser (service)
 */
export const registerSchema = z
  .object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

/**
 * Schema without confirmPassword — used server-side only (service / action)
 * where confirmPassword has already been validated on the client.
 */
export const registerServiceSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Used in: LoginForm (client), validateCredentials (service)
 */
export const loginSchema = z
  .object({
    email: emailSchema,
    password: z.string().min(1, "Password wajib diisi."),
  });

/**
 * Used in: ChangePasswordForm (client), changePasswordAction (server)
 */
export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Password lama wajib diisi."),
    newPassword: passwordSchema,
    confirmNewPassword: confirmPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password tidak cocok.",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Password baru harus berbeda dari password lama.",
    path: ["newPassword"],
  });

/**
 * Server-side schema for changing password (without confirmNewPassword)
 */
export const changePasswordServiceSchema = z
  .object({
    oldPassword: z.string().min(1, "Password lama wajib diisi."),
    newPassword: passwordSchema,
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Password baru harus berbeda dari password lama.",
    path: ["newPassword"],
  });

// ── Helper: flatten Zod errors into a field-keyed object ───────────────────

/**
 * Converts a ZodError into a flat { field: firstMessage } map.
 * @param {import("zod").ZodError} zodError
 * @returns {Record<string, string>}
 */
export function flattenZodErrors(zodError) {
  return Object.fromEntries(
    Object.entries(zodError.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
  );
}