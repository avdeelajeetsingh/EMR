// api/reports/doctor-workload.js

const DATA = [
  { doctor_name: "Dr. Sharma", count: 2 },
  { doctor_name: "Dr. Verma", count: 1 },
];

export default function handler(req, res) {
  res.status(200).json(DATA);
}
