import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind + conditional class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate full months + remaining days between a given date and now
 * @param createdAt - date string or Date object
 * @returns { months: number, days: number }
 */
export function getMonthsAndDays(createdAt: string | Date) {
  const start = new Date(createdAt)
  const now = new Date()

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())

  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0) // last day of prev month
    days = prevMonth.getDate() + days
  }

  return {
    months: Math.max(0, months),
    days: Math.max(0, days),
  }
}
