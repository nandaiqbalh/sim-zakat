import {
  findUserById,
  updateUser,
  findUserByPhone,
} from "@/lib/repositories/user.repository";
import {
  profileSchema,
  flattenZodErrors,
} from "@/lib/validations/profile.schema";

/**
 * Update user profile with server-side validation.
 * - Validates input schema (name, phone, gender, birthdate)
 * - Checks for duplicate phone (if being changed)
 * - Updates user record
 * 
 * @param {string} userId - User ID from session
 * @param {{ name: string, phone?: string, gender?: string, birthdate?: string }} payload
 * @returns {Promise<{ success: boolean, message: string, errors?: Record<string, string> }>}
 */
export async function updateUserProfile(userId, payload) {
  // ── Schema validation ──
  const parsed = profileSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    const firstMessage = Object.values(errors).find(Boolean) ?? "Input tidak valid.";
    return { success: false, message: firstMessage, errors };
  }

  // ── Verify user exists ──
  const userRes = await findUserById(userId);
  if (!userRes.success || !userRes.data) {
    return { success: false, message: "Pengguna tidak ditemukan." };
  }

  const user = userRes.data;
  const { name, phone, gender, birthdate } = parsed.data;

  // ── Check for duplicate phone (if provided and different) ──
  if (phone && phone !== user.phone) {
    const phoneRes = await findUserByPhone(phone);
    if (phoneRes.success && phoneRes.data) {
      return {
        success: false,
        message: "Nomor telepon sudah digunakan.",
        errors: { phone: "Nomor telepon sudah digunakan." },
      };
    }
  }

  // ── Update user profile ──
  const updateRes = await updateUser(userId, {
    name,
    ...(phone && { phone }),
    ...(gender && { gender }),
    ...(birthdate && { birthdate }),
  });

  if (!updateRes.success) {
    return { success: false, message: updateRes.message };
  }

  return {
    success: true,
    message: "Profil berhasil diperbarui.",
  };
}

/**
 * Get user profile by ID.
 * @param {string} userId
 * @returns {Promise<{ success: boolean, message: string, data?: object }>}
 */
export async function getUserProfileById(userId) {
  const userRes = await findUserById(userId);
  if (!userRes.success || !userRes.data) {
    return { success: false, message: "Pengguna tidak ditemukan." };
  }

  const user = userRes.data;
  return {
    success: true,
    message: "Profil berhasil diambil.",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ?? null,
      phone: user.phone,
      gender: user.gender,
      birthdate: user.birthdate,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
}