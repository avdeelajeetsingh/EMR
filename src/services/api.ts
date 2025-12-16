
// Vercel Serverless API (same-origin)
const API_BASE = "";

type AppointmentPayload = {
  patient_name: string;
  doctor_name: string;
  time_slot: string;
  status: string;
};

// ================= APPOINTMENTS =================

export async function createAppointment(data: AppointmentPayload) {
  const res = await fetch(`${API_BASE}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}

export async function getAppointments(doctor: string, date: string) {
  const res = await fetch(
    `${API_BASE}/api/appointments?doctor=${encodeURIComponent(
      doctor
    )}&date=${date}`
  );

  if (!res.ok) throw new Error("Failed to fetch appointments");
  return res.json();
}

export async function getAllAppointments() {
  const res = await fetch(`${API_BASE}/api/appointments`);
  if (!res.ok) throw new Error("Failed to fetch all appointments");
  return res.json();
}

export async function updateStatus(id: string, status: string) {
  const res = await fetch(`${API_BASE}/api/appointments/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update status");
}

// ================= PATIENTS =================

export async function getPatients() {
  const res = await fetch(`${API_BASE}/api/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function getPatientDetails(name: string) {
  const res = await fetch(
    `${API_BASE}/api/patients/${encodeURIComponent(name)}`
  );
  if (!res.ok) throw new Error("Failed to fetch patient details");
  return res.json();
}

// ================= REPORTS =================

export async function getDailyReport(date: string) {
  const res = await fetch(`${API_BASE}/api/reports/daily?date=${date}`);
  return res.json();
}

export async function getWeeklyReport(startDate: string) {
  const res = await fetch(
    `${API_BASE}/api/reports/weekly?start_date=${startDate}`
  );
  return res.json();
}

export async function getDoctorWorkload() {
  const res = await fetch(`${API_BASE}/api/reports/doctor-workload`);
  return res.json();
}

export async function getCancellationReport() {
  const res = await fetch(`${API_BASE}/api/reports/cancellations`);
  return res.json();
}

// ================= SETTINGS =================

export async function getSettings() {
  const res = await fetch(`${API_BASE}/api/settings`);
  return res.json();
}

export async function updateSettings(data: any) {
  const res = await fetch(`${API_BASE}/api/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
