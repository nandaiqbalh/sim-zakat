import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indonesian Rupiah.
 * @param {number|string} amount
 */
export function formatIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

/**
 * Format a number as kilograms.
 * @param {number|string} kg
 */
export function formatKg(kg) {
  return `${(Number(kg) || 0).toFixed(2)} kg`;
}
