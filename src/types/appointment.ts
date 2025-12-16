export type AppointmentStatus =
  | "Confirmed"
  | "Scheduled"
  | "Upcoming"
  | "Cancelled";

export type AppointmentMode = "In-Person" | "Video" | "Phone";

export interface Appointment {
  id: string;
  name: string;
  date: string;
  time: string;
  duration: number;
  doctorName: string;
  status: AppointmentStatus;
  mode: AppointmentMode;
  reason?: string;
}
