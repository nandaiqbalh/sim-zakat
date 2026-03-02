// lib/repositories/mosque.repository.js
import prisma from "@/lib/prisma";
import { GeneralResponse } from "@/lib/model/response";

export async function createMosque({ name, address }) {
  try {
    const mosque = await prisma.mosque.create({
      data: { name: name.trim(), address: address?.trim() || null },
    });
    return new GeneralResponse(true, "Mosque created successfully.", mosque);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Error creating mosque.", null);
  }
}

export async function findMosqueById(id) {
  try {
    const mosque = await prisma.mosque.findUnique({ where: { id } });
    if (!mosque) return new GeneralResponse(false, "Mosque not found.", null);
    return new GeneralResponse(true, "Success.", mosque);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Error.", null);
  }
}

/**
 * Find the first mosque a user belongs to (via MosqueUser).
 */
export async function findMosqueByUserId(userId) {
  try {
    const mosqueUser = await prisma.mosqueUser.findFirst({
      where: { userId },
      include: { mosque: true },
      orderBy: { id: "asc" },
    });
    if (!mosqueUser) return new GeneralResponse(false, "No mosque found for user.", null);
    return new GeneralResponse(true, "Success.", mosqueUser.mosque);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Error.", null);
  }
}

/**
 * Find the MosqueUser record for a user (includes role + mosque).
 */
export async function findMosqueUserByUserId(userId) {
  try {
    const mosqueUser = await prisma.mosqueUser.findFirst({
      where: { userId },
      include: { mosque: true },
      orderBy: { id: "asc" },
    });
    if (!mosqueUser) return new GeneralResponse(false, "Not a mosque member.", null);
    return new GeneralResponse(true, "Success.", mosqueUser);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Error.", null);
  }
}

export async function addUserToMosque({ userId, mosqueId, role }) {
  try {
    const mosqueUser = await prisma.mosqueUser.create({
      data: { userId, mosqueId, role },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return new GeneralResponse(true, "User added to mosque.", mosqueUser);
  } catch (e) {
    if (e.code === "P2002") {
      return new GeneralResponse(false, "User is already a member of this mosque.", null);
    }
    return new GeneralResponse(false, e.message || "Error.", null);
  }
}

export async function getMosqueUsers(mosqueId) {
  try {
    const users = await prisma.mosqueUser.findMany({
      where: { mosqueId },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { id: "asc" },
    });
    return new GeneralResponse(true, "Success.", users);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Error.", null);
  }
}

export async function removeMosqueUser(mosqueUserId) {
  try {
    // retrieve the record so we know which user to delete as well
    const record = await prisma.mosqueUser.findUnique({ where: { id: mosqueUserId } });
    if (!record) {
      return new GeneralResponse(false, "Staf tidak ditemukan.", null);
    }

    await prisma.mosqueUser.delete({ where: { id: mosqueUserId } });

    // also remove the underlying user account; cascading will clean up related rows
    await prisma.user.delete({ where: { id: record.userId } });

    return new GeneralResponse(true, "User removed from mosque.", null);
  } catch (e) {
    return new GeneralResponse(false, e.message || "Error.", null);
  }
}
