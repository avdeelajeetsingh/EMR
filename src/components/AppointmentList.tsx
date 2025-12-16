import { Appointment, AppointmentStatus } from '@/types/appointment';
import { AppointmentCard } from './AppointmentCard';
import { CalendarX } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
  onStatusChange: (id: string, newStatus: AppointmentStatus) => void;
}

export function AppointmentList({
  appointments,
  onStatusChange,
}: AppointmentListProps) {

  if (appointments.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div>
          <CalendarX className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-display font-semibold text-foreground mb-1">
            No appointments found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try selecting a different date or filter
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      {appointments.map((appointment, index) => (
        <div key={appointment.id} style={{ animationDelay: `${index * 50}ms` }}>
          <AppointmentCard
            appointment={appointment}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
    </div>
  );
}
