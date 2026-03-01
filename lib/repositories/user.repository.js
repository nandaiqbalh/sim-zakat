// lib/repositories/user.repository.js

import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

/**
 * Cari user berdasarkan email (case-insensitive via normalisasi sebelum query).
 * @param {string} email
 * @returns {Promise<import("@prisma/client").User | null>}
 */
export async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user) return new GeneralResponse(false, "Pengguna tidak ditemukan.", null);
    return new GeneralResponse(true, "Berhasil.", user);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}


/**
 * Cari user berdasarkan nomor telepon.
 * @param {string} phone
 * @returns {Promise<import("@prisma/client").User | null>}
 */
export async function findUserByPhone(phone) {
  try {
    const user = await prisma.user.findUnique({
      where: { phone: phone.trim() },
    });
    if (!user) return new GeneralResponse(false, "Pengguna tidak ditemukan.", null);
    return new GeneralResponse(true, "Berhasil.", user);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

/**
 * Cari user berdasarkan id.
 * @param {string} id
 * @returns {Promise<import("@prisma/client").User | null>}
 */
export async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return new GeneralResponse(false, "Pengguna tidak ditemukan.", null);
    return new GeneralResponse(true, "Berhasil.", user);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

/**
 * Buat user baru.
 * @param {{ name: string, phone?: string, email: string, password: string, role?: "SUPERADMIN"|"ADMIN"|"USER" }} data
 * @returns {Promise<import("@prisma/client").User>}
 */
export async function createUser({ name, phone, email, password, role = "USER" }) {
  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email.toLowerCase().trim(),
        password,            // sudah di-hash sebelum masuk sini
        role,
      },
    });
    return new GeneralResponse(true, "Pengguna berhasil dibuat.", user);
  } catch (e) {
    // handle prisma unique constraint errors for readability
    if (e.code === "P2002" && e.meta && e.meta.target) {
      const field = Array.isArray(e.meta.target) ? e.meta.target[0] : e.meta.target;
      let msg = "Data sudah digunakan.";
      switch (field) {
        case "email":
          msg = "Email sudah terdaftar.";
          break;
        case "phone":
          msg = "Nomor telepon sudah digunakan.";
          break;
      }
      return new GeneralResponse(false, msg, null);
    }
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}

/**
 * Update profil user atau password.
 * @param {string} id
 * @param {Partial<{ name: string, phone: string, image: string, password: string }>} data
 */
export async function updateUser(id, data) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return new GeneralResponse(true, "Profil pengguna berhasil diperbarui.", user);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Terjadi kesalahan.", null);
  }
}