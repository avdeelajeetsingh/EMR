import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  TrendingUp,
  XCircle,
  Users,
  MapPin,
  Video,
  Phone,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

interface Appointment {
  id: string;
  doctor_name: string;
  status: string;
  mode?: string;
  time_slot: string;
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // ---------------------------
  // Fetch ALL appointments
  // ---------------------------
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/appointments/all`);
      if (!res.ok) return;
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  };

  // ---------------------------
  // Initial load + auto refresh
  // ---------------------------
  useEffect(() => {
    fetchAppointments();

    const interval = setInterval(() => {
      fetchAppointments();
    }, 5000); // 🔥 real-time refresh every 5 sec

    return () => clearInterval(interval);
  }, []);

  // ---------------------------
  // Derived stats
  // ---------------------------
  const todayStr = new Date().toISOString().split("T")[0];

  const total = appointments.length;
  const today = appointments.filter(a =>
    a.time_slot.startsWith(todayStr)
  ).length;

  const upcoming = appointments.filter(a =>
    a.time_slot > new Date().toISOString()
  ).length;

  const cancelled = appointments.filter(a =>
    a.status.toLowerCase() === "cancelled"
  ).length;

  const inPerson = appointments.filter(a => a.mode === "In-Person").length;
  const video = appointments.filter(a => a.mode === "Video").length;
  const phone = appointments.filter(a => a.mode === "Phone").length;

  const byDoctor = appointments.reduce((acc: Record<string, number>, a) => {
    acc[a.doctor_name] = (acc[a.doctor_name] || 0) + 1;
    return acc;
  }, {});

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Overview of appointment statistics (live)
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Appointments" value={total} icon={Calendar} />
        <StatCard title="Today" value={today} icon={Clock} />
        <StatCard title="Upcoming" value={upcoming} icon={TrendingUp} />
        <StatCard title="Cancelled" value={cancelled} icon={XCircle} />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Mode */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Appointments by Mode</h3>
          <ModeRow icon={MapPin} label="In-Person" value={inPerson} />
          <ModeRow icon={Video} label="Video" value={video} />
          <ModeRow icon={Phone} label="Phone" value={phone} />
        </Card>

        {/* By Doctor */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Appointments by Doctor</h3>
          {Object.entries(byDoctor).map(([doc, count]) => (
            <div
              key={doc}
              className="flex justify-between items-center mb-2"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>{doc}</span>
              </div>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ---------------------------
// Small helper components
// ---------------------------
function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: any;
}) {
  return (
    <Card className="p-4 flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Card>
  );
}

function ModeRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
