export type AppointmentStatus =
  | "Confirmed"
  | "Scheduled"
  | "Cancelled"
  | "Completed";

export interface Appointment {
  id: string;
  name: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  mode: string;
  reason: string;
}
