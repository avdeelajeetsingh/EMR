import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAppointments } from '@/services/api';
import { Appointment } from '@/types/appointment';
import { Clock, Video, Phone, MapPin, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const DEFAULT_DOCTOR = 'Dr. Sarah Kim';

const modeIcons: Record<string, React.ReactNode> = {
  'In-Person': <MapPin className="h-5 w-5" />,
  'Video': <Video className="h-5 w-5" />,
  'Phone': <Phone className="h-5 w-5" />,
};

export default function Queue() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const today = new Date().toISOString().split('T')[0];

  const loadQueue = useCallback(async () => {
    const data = await getAppointments(DEFAULT_DOCTOR, today);

    const mapped: Appointment[] = data.map((a: any) => ({
      id: a.id,
      name: a.patient_name,
      doctorName: a.doctor_name,
      date: a.time_slot.split('T')[0],
      time: a.time_slot.split('T')[1].slice(0, 5),
      duration: 30,
      status: a.status.charAt(0).toUpperCase() + a.status.slice(1),
      mode: a.mode || 'In-Person',
      reason: '',
    }));

    setAppointments(mapped);
  }, [today]);

  useEffect(() => {
    loadQueue();

    // 🔥 live refresh
    const interval = setInterval(loadQueue, 5000);
    return () => clearInterval(interval);
  }, [loadQueue]);

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-status-confirmed text-white';
      case 'Scheduled':
        return 'bg-status-scheduled text-white';
      case 'Upcoming':
        return 'bg-status-upcoming text-white';
      case 'Cancelled':
        return 'bg-status-cancelled text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">
            Queue Display
          </h1>
        </div>
        <p className="text-muted-foreground">
          Live appointment queue for{' '}
          {new Date(today).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {appointments.map((apt, index) => (
          <Card
            key={apt.id}
            className={cn(
              'p-5 transition-all duration-300 animate-slide-up',
              apt.status === 'Cancelled' && 'opacity-50'
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{apt.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {apt.doctorName}
                  </p>
                </div>
              </div>
              <Badge className={cn('text-xs', getStatusColor(apt.status))}>
                {apt.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-medium text-foreground">
                  {formatTime(apt.time)}
                </span>
                <span>• {apt.duration} min</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {modeIcons[apt.mode]}
              </div>
            </div>

            {apt.reason && (
              <p className="mt-3 text-sm text-muted-foreground border-t border-border pt-3">
                {apt.reason}
              </p>
            )}
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No appointments scheduled for today</p>
        </div>
      )}

      {/* Summary */}
      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {['Confirmed', 'Scheduled', 'Upcoming', 'Cancelled'].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full bg-status-${s.toLowerCase()}`} />
              <span className="text-muted-foreground">
                {s}: {appointments.filter(a => a.status === s).length}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
