import { Appointment, AppointmentStatus } from "@/types/appointment";

/**
 * In-memory mock DB (Vercel-safe)
 */
let MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "A001",
    name: "Rahul Mehta",
    doctorName: "Dr. Sharma",
    date: "2025-12-20",
    time: "10:30",
    duration: 30,
    status: "Confirmed",
    mode: "In-Person",
    reason: "Routine checkup",
  },
  {
    id: "A002",
    name: "Anita Singh",
    doctorName: "Dr. Verma",
    date: "2025-12-21",
    time: "14:00",
    duration: 45,
    status: "Scheduled",
    mode: "Video",
    reason: "Follow-up",
  },
];

export async function getAllAppointments(): Promise<Appointment[]> {
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_APPOINTMENTS];
}

export async function createAppointment(
  data: Omit<Appointment, "id">
) {
  await new Promise((r) => setTimeout(r, 300));

  MOCK_APPOINTMENTS.push({
    id: crypto.randomUUID(),
    ...data,
  });

  return { success: true };
}

export async function updateStatus(
  id: string,
  status: AppointmentStatus
) {
  await new Promise((r) => setTimeout(r, 300));

  MOCK_APPOINTMENTS = MOCK_APPOINTMENTS.map((a) =>
    a.id === id ? { ...a, status } : a
  );

  return { success: true };
}
