const API_URL = import.meta.env.VITE_API_URL;

export async function createAppointment(data: {
  patient_name: string;
  doctor_name: string;
  time_slot: string;
  status: string;
  
}) {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAppointments(doctor: string, date: string) {
  const res = await fetch(
    `${API_URL}/appointments/${encodeURIComponent(doctor)}?date_str=${date}`
  );
  return res.json();
}

export async function updateStatus(id: string, status: string) {
  await fetch(`${API_URL}/appointments/${id}/status?status=${status}`, {
    method: "PATCH",
  });
}

export async function getPatients() {
  const res = await fetch(`${API_URL}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function getPatientDetails(name: string) {
  const res = await fetch(`${API_URL}/patients/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch patient details");
  return res.json();
}

export async function getAllAppointments() {
  const res = await fetch(`${API_URL}/appointments`);
  if (!res.ok) throw new Error("Failed to fetch all appointments");
  return res.json();
}

// ================= REPORTS =================

export async function getDailyReport(date: string) {
  const res = await fetch(`${API_URL}/reports/daily?date=${date}`);
  return res.json();
}

export async function getWeeklyReport(startDate: string) {
  const res = await fetch(`${API_URL}/reports/weekly?start_date=${startDate}`);
  return res.json();
}

export async function getDoctorWorkload() {
  const res = await fetch(`${API_URL}/reports/doctor-workload`);
  return res.json();
}

export async function getCancellationReport() {
  const res = await fetch(`${API_URL}/reports/cancellations`);
  return res.json();
}

export async function getSettings() {
  const res = await fetch(`${API_URL}/settings`);
  return res.json();
}

export async function updateSettings(data: any) {
  const res = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
