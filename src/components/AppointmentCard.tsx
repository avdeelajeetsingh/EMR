import { Appointment, AppointmentStatus } from '@/types/appointment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Clock,
  User,
  Video,
  Phone,
  MapPin,
  MoreVertical,
  CheckCircle,
  XCircle,
  Calendar,
  Pencil,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange: (id: string, newStatus: AppointmentStatus) => void;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointment: Appointment) => void;
}

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  Confirmed: { label: 'Confirmed', className: 'status-confirmed' },
  Scheduled: { label: 'Scheduled', className: 'status-scheduled' },
  Upcoming: { label: 'Upcoming', className: 'status-upcoming' },
  Cancelled: { label: 'Cancelled', className: 'status-cancelled' },
};

const modeIcons: Record<string, React.ReactNode> = {
  'In-Person': <MapPin className="h-4 w-4" />,
  Video: <Video className="h-4 w-4" />,
  Phone: <Phone className="h-4 w-4" />,
};

const modeColors: Record<string, string> = {
  'In-Person': 'text-mode-in-person',
  Video: 'text-mode-video',
  Phone: 'text-mode-phone',
};

export function AppointmentCard({
  appointment,
  onStatusChange,
  onEdit,
  onDelete,
}: AppointmentCardProps) {
  const {
    id,
    name,
    date,
    time,
    duration,
    doctorName,
    status,
    mode,
    reason,
  } = appointment;

  // ✅ SAFE FALLBACKS
  const statusInfo =
    statusConfig[status] ?? statusConfig['Scheduled'];

  const safeMode = modeIcons[mode] ? mode : 'In-Person';

  // ✅ FIXED DATE PARSING (timezone-safe)
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const availableStatuses: AppointmentStatus[] = [
    'Confirmed',
    'Scheduled',
    'Upcoming',
    'Cancelled',
  ];

  return (
    <Card
      className={cn(
        'p-4 transition-all duration-200 hover:shadow-card-hover animate-slide-up',
        status === 'Cancelled' && 'opacity-60'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground truncate">
              {name}
            </h3>
            <span
              className={cn(
                'status-badge',
                statusInfo.className
              )}
            >
              {statusInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
            <User className="h-3.5 w-3.5" />
            <span>{doctorName}</span>
          </div>

          {reason && (
            <p className="text-sm text-muted-foreground mb-2 truncate">
              {reason}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(date)}</span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>
                {formatTime(time)} • {duration} min
              </span>
            </div>

            <div
              className={cn(
                'flex items-center gap-1',
                modeColors[safeMode]
              )}
            >
              {modeIcons[safeMode]}
              <span>{safeMode}</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(appointment)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            )}

            {availableStatuses
              .filter((s) => s !== status)
              .map((newStatus) => (
                <DropdownMenuItem
                  key={newStatus}
                  onClick={() =>
                    onStatusChange(id, newStatus)
                  }
                >
                  {newStatus === 'Confirmed' && (
                    <CheckCircle className="h-4 w-4 mr-2 text-status-confirmed" />
                  )}
                  {newStatus === 'Cancelled' && (
                    <XCircle className="h-4 w-4 mr-2 text-status-cancelled" />
                  )}
                  {newStatus === 'Scheduled' && (
                    <Calendar className="h-4 w-4 mr-2 text-status-scheduled" />
                  )}
                  {newStatus === 'Upcoming' && (
                    <Clock className="h-4 w-4 mr-2 text-status-upcoming" />
                  )}
                  {newStatus}
                </DropdownMenuItem>
              ))}

            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(appointment)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
