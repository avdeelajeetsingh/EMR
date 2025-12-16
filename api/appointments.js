export default function handler(req, res) {
  const appointments = [
    {
      id: "A001",
      name: "Rahul Mehta",
      doctorName: "Dr. Sharma",
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
      doctorName: "Dr. Verma",
      date: "2025-12-21",
      time: "14:00",
      duration: 45,
      status: "Scheduled",
      mode: "Video",
      reason: "Follow-up",
    },
  ];

  res.status(200).json(appointments);
}