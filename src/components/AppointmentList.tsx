import { useEffect, useState } from "react";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { AppointmentCard } from "./AppointmentCard";
import { CalendarX } from "lucide-react";
import { getAllAppointments, updateStatus } from "@/services/api";

export function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAppointments()
      .then(setAppointments)
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: AppointmentStatus
  ) => {
    await updateStatus(id, newStatus);
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <CalendarX className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="font-display font-semibold text-foreground mb-1">
          No appointments found
        </h3>
        <p className="text-sm text-muted-foreground">
          Try selecting a different date or filter
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      {appointments.map((appointment, index) => (
        <div key={appointment.id} style={{ animationDelay: `${index * 50}ms` }}>
          <AppointmentCard
            appointment={appointment}
            onStatusChange={handleStatusChange}
          />
        </div>
      ))}
    </div>
  );
}
