// lib/actions/mosque.actions.js
"use server";

import { validateSession } from "@/lib/validations/validate-session";
import {
  setupMosque,
  getMosqueContext,
  addStaffToMosque,
  getStaffList,
  removeStaff,
} from "@/lib/services/mosque.service";

export async function setupMosqueAction(formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return setupMosque(sessionRes.data.userId, formData);
}

export async function getMosqueContextAction() {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return getMosqueContext(sessionRes.data.userId);
}

export async function addStaffAction(mosqueId, formData) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return addStaffToMosque(mosqueId, formData);
}

export async function getStaffAction(mosqueId) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return getStaffList(mosqueId);
}

export async function removeStaffAction(mosqueUserId) {
  const sessionRes = await validateSession();
  if (!sessionRes.success) return { success: false, message: sessionRes.message };
  return removeStaff(mosqueUserId);
}
