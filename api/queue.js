// api/queue.js

import appointments from "./appointments.js";

export default function handler(req, res) {
  const today = "2025-12-20"; // fixed for demo

  const queue = appointments.filter(a => a.date === today);

  res.status(200).json(queue);
}
