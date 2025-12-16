export default function handler(req, res) {
  const appointments = [
    {
      id: "A001",
      patientName: "Rahul Mehta",
      doctor: "Dr. Sharma",
      date: "2025-12-20",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      id: "A002",
      patientName: "Anita Singh",
      doctor: "Dr. Verma",
      date: "2025-12-21",
      time: "2:00 PM",
      status: "Pending"
    }
  ];

  res.status(200).json(appointments);
}
