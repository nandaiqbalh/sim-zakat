// lib/services/mosque.service.js
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { findUserByEmail, createUser } from "@/lib/repositories/user.repository";
import {
  createMosque,
  findMosqueByUserId,
  findMosqueUserByUserId,
  addUserToMosque,
  getMosqueUsers,
  removeMosqueUser,
} from "@/lib/repositories/mosque.repository";
import { mosqueSchema, createStaffSchema, flattenZodErrors } from "@/lib/validations/mosque.schema";

export async function setupMosque(userId, payload) {
  const parsed = mosqueSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }

  // Prevent duplicate mosque setup
  const existingRes = await findMosqueByUserId(userId);
  if (existingRes.success && existingRes.data) {
    return { success: false, message: "Anda sudah mendaftarkan masjid." };
  }

  const mosqueRes = await createMosque(parsed.data);
  if (!mosqueRes.success) return { success: false, message: mosqueRes.message };

  const linkRes = await addUserToMosque({
    userId,
    mosqueId: mosqueRes.data.id,
    role: "MANAGER",
  });
  if (!linkRes.success) return { success: false, message: linkRes.message };

  // Elevate user to ADMIN so they can access /admin/* on next login
  await prisma.user.update({ where: { id: userId }, data: { role: "ADMIN" } }).catch(() => {});

  return { success: true, message: "Masjid berhasil dibuat.", data: mosqueRes.data };
}

export async function getMosqueContext(userId) {
  return findMosqueByUserId(userId);
}

/**
 * Add a staff member to the mosque.
 * If the user doesn't exist yet, a new account is automatically created.
 */
export async function addStaffToMosque(mosqueId, payload) {
  const parsed = createStaffSchema.safeParse(payload);
  if (!parsed.success) {
    const errors = flattenZodErrors(parsed.error);
    return { success: false, message: Object.values(errors)[0] ?? "Input tidak valid.", errors };
  }

  const { name, email, password, phone, mosqueRole } = parsed.data;

  // Find or create the user account
  let userId;
  const existingRes = await findUserByEmail(email);
  if (existingRes.success && existingRes.data) {
    userId = existingRes.data.id;
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRes = await createUser({
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: "ADMIN",
    });
    if (!userRes.success) {
      return { success: false, message: userRes.message || "Gagal membuat akun staf." };
    }
    userId = userRes.data.id;
  }

  // Prevent a single account from belonging to more than one mosque
  const memberCheck = await findMosqueUserByUserId(userId);
  if (memberCheck.success && memberCheck.data) {
    // if the existing record is for a different mosque, block
    if (memberCheck.data.mosqueId !== mosqueId) {
      return { success: false, message: "Akun sudah terdaftar di masjid lain." };
    }
    // otherwise the user is already part of this mosque; let the unique constraint handle duplicates
  }

  const linkRes = await addUserToMosque({ userId, mosqueId, role: mosqueRole });
  return { success: linkRes.success, message: linkRes.message, data: linkRes.data };
}

export async function getStaffList(mosqueId) {
  return getMosqueUsers(mosqueId);
}

export async function removeStaff(mosqueUserId) {
  return removeMosqueUser(mosqueUserId);
}
