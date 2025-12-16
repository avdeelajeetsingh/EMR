import { useState, useEffect, useMemo } from "react";
import { Appointment, AppointmentStatus } from "@/types/appointment";
import { CalendarWidget } from "@/components/CalendarWidget";
import { AppointmentTabs, TabValue } from "@/components/AppointmentTabs";
import { AppointmentList } from "@/components/AppointmentList";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import {
  createAppointment,
  getAllAppointments,
  updateStatus,
} from "@/services/api";
import { useSearchParams } from "react-router-dom";

/** ✅ LOCAL DATE (timezone-safe) */
function toLocalDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Index() {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<TabValue>("today");
  const [formOpen, setFormOpen] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [selectedDoctor] = useState("Dr. Sarah Kim");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setFormOpen(true);
      setSearchParams({});
    }
  }, []);

  // -------------------------
  // Load ALL appointments
  // -------------------------
  const loadAllAppointments = async () => {
    const data = await getAllAppointments();

    const statusMap: Record<string, AppointmentStatus> = {
      waiting: "Scheduled",
      in_progress: "Upcoming",
      completed: "Confirmed",
      cancelled: "Cancelled",
    };

    const mapped: Appointment[] = data.map((a: any) => ({
      id: a.id,
      name: a.patient_name,
      doctorName: a.doctor_name,
      date: a.time_slot.split("T")[0],
      time: a.time_slot.split("T")[1].slice(0, 5),
      duration: 30,
      status: statusMap[a.status] ?? "Scheduled",
      mode: "In-Person",
      reason: "",
    }));

    setAllAppointments(mapped);
    setHighlightedDates([...new Set(mapped.map(a => a.date))]);
  };

  useEffect(() => {
    loadAllAppointments();
  }, []);

  // -------------------------
  // FILTER (timezone-safe)
  // -------------------------
  const visibleAppointments = useMemo(() => {
    const dateStr = toLocalDateString(selectedDate);

    return allAppointments.filter(a =>
      a.date === dateStr
    );
  }, [allAppointments, selectedDoctor, selectedDate]);

  // -------------------------
  // Create
  // -------------------------
  const handleFormSubmit = async (data: Omit<Appointment, "id">) => {
    await createAppointment({
      patient_name: data.name,
      doctor_name: data.doctorName,
      time_slot: `${data.date}T${data.time}:00`,
      status: "waiting",
    });

    toast({ title: "Appointment Created" });
    setFormOpen(false);
    await loadAllAppointments();
  };

  // -------------------------
  // Update status
  // -------------------------
  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    await updateStatus(id, newStatus.toLowerCase());
    await loadAllAppointments();
  };

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-[320px_1fr] gap-6 flex-1">
        <CalendarWidget
          selectedDate={selectedDate}
          onDateSelect={(d) => d && setSelectedDate(d)}
          highlightedDates={highlightedDates}
        />

        <Card className="p-6 flex flex-col">
          <AppointmentTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={{
              today: visibleAppointments.length,
              upcoming: 0,
              past: 0,
            }}
          />

          <div className="mt-6 flex-1">
            <AppointmentList
              appointments={visibleAppointments}
              onStatusChange={handleStatusChange}
            />
          </div>
        </Card>
      </div>

      <AppointmentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        mode="create"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
