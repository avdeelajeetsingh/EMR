import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CalendarWidgetProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  highlightedDates?: string[];
}

export function CalendarWidget({
  selectedDate,
  onDateSelect,
  highlightedDates = [],
}: CalendarWidgetProps) {

  const modifiers = {
    hasAppointment: highlightedDates.map(
      d => new Date(`${d}T12:00:00`)
    ),
  };

  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-3">Select Date</h3>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        modifiers={modifiers}
        modifiersStyles={{
          hasAppointment: { fontWeight: 600 },
        }}
        classNames={{
          day_selected: "bg-primary text-primary-foreground",
          day_today: "bg-accent font-semibold",
          day: cn(
            "h-9 w-9 hover:bg-accent rounded-md"
          ),
        }}
      />
    </Card>
  );
}
