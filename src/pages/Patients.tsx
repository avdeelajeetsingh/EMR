import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getPatients, getPatientDetails } from "@/services/api";
import { User, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PatientSummary {
  name: string;
  visits: number;
  last_visit: string;
}

interface PatientDetails {
  patient_name: string;
  total_visits: number;
  appointments: any[];
}

export default function Patients() {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientDetails | null>(null);

  const navigate = useNavigate();

  // -------------------------
  // Load patients list
  // -------------------------
  const loadPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // -------------------------
  // View details
  // -------------------------
  const openDetails = async (name: string) => {
    const details = await getPatientDetails(name);
    setSelectedPatient(details);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-muted-foreground">
            Manage patient records
          </p>
        </div>

        {/* 🔥 REDIRECT instead of creating appointment here */}
        <Button onClick={() => navigate("/?new=1")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {patients.map((p) => (
          <Card
            key={p.name}
            className="p-4 flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  {p.visits} visit(s) • Last: {p.last_visit}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => openDetails(p.name)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>

      {/* -------------------------
          Patient Details Modal
         ------------------------- */}
      {selectedPatient && (
        <Dialog
          open={true}
          onOpenChange={() => setSelectedPatient(null)}
        >
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedPatient.patient_name}
              </DialogTitle>
              <DialogDescription>
                Total Visits: {selectedPatient.total_visits}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 max-h-[350px] overflow-y-auto">
              {selectedPatient.appointments.map((a) => (
                <div
                  key={a.id}
                  className="border rounded-lg p-3 text-sm"
                >
                  <p><b>Date:</b> {a.time_slot.split("T")[0]}</p>
                  <p><b>Time:</b> {a.time_slot.split("T")[1].slice(0, 5)}</p>
                  <p><b>Doctor:</b> {a.doctor_name}</p>
                  <p><b>Status:</b> {a.status}</p>
                  <p><b>Mode:</b> {a.mode}</p>
                  <p><b>Queue:</b> {a.queue_number}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
