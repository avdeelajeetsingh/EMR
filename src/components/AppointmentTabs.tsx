import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, History } from 'lucide-react';

export type TabValue = 'upcoming' | 'today' | 'past';

interface AppointmentTabsProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  counts: {
    upcoming: number;
    today: number;
    past: number;
  };
}

export function AppointmentTabs({ activeTab, onTabChange, counts }: AppointmentTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as TabValue)} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
        <TabsTrigger 
          value="upcoming" 
          className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
        >
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">Upcoming</span>
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-status-upcoming-bg text-status-upcoming text-xs font-medium">
            {counts.upcoming}
          </span>
        </TabsTrigger>
        <TabsTrigger 
          value="today" 
          className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">Today</span>
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-status-confirmed-bg text-status-confirmed text-xs font-medium">
            {counts.today}
          </span>
        </TabsTrigger>
        <TabsTrigger 
          value="past" 
          className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
        >
          <History className="h-4 w-4" />
          <span className="hidden sm:inline">Past</span>
          <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {counts.past}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
