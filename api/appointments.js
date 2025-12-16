// api/appointments.js

const MOCK_APPOINTMENTS = [
  {
    id: "A001",
    name: "Rahul Mehta",
    doctor_name: "Dr. Sharma",
    date: "2025-12-20",
    time: "10:30",
    duration: 30,
    status: "Confirmed",
    mode: "In-Person",
    reason: "Routine checkup",
  },
  {
    id: "A002",
    name: "Anita Singh",
    doctor_name: "Dr. Verma",
    date: "2025-12-20",
    time: "14:00",
    duration: 45,
    status: "Scheduled",
    mode: "Video",
    reason: "Follow-up",
  },
  {
    id: "A003",
    name: "Karan Patel",
    doctor_name: "Dr. Sharma",
    date: "2025-12-21",
    time: "09:15",
    duration: 20,
    status: "Upcoming",
    mode: "Phone",
    reason: "Consultation",
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(MOCK_APPOINTMENTS);
  }

  if (req.method === "POST") {
    const newAppointment = {
      id: "A" + Math.floor(Math.random() * 10000),
      ...req.body,
    };

    MOCK_APPOINTMENTS.push(newAppointment);

    return res.status(201).json(newAppointment);
  }

  res.status(405).json({ error: "Method not allowed" });
}
