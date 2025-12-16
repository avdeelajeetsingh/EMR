// src/services/api.ts

export async function getAllAppointments() {
  const res = await fetch("/api/appointments");
  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

/**
 * MOCK status update
 * No backend call (Vercel-safe)
 */
export async function updateStatus(
  _id: string,
  _status: string
) {
  // simulate latency
  return new Promise((resolve) => setTimeout(resolve, 300));
}
