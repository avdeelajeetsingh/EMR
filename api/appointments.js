import { pool } from "./_db.js";
import { randomUUID } from "crypto";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const result = await pool.query(`
        SELECT
          id,
          name,
          doctor_name AS "doctorName",
          to_char(date, 'YYYY-MM-DD') AS date,
          time,
          duration,
          status,
          mode,
          reason
        FROM appointments
        ORDER BY date, time
      `);
      return res.json(result.rows);
    }

    if (req.method === "POST") {
      const {
        name,
        doctorName,
        date,
        time,
        duration,
        status,
        mode,
        reason,
      } = req.body;

      await pool.query(
        `INSERT INTO appointments
         (id, name, doctor_name, date, time, duration, status, mode, reason)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          randomUUID(),
          name,
          doctorName,
          date,
          time,
          duration,
          status,
          mode,
          reason,
        ]
      );

      return res.json({ success: true });
    }

    res.status(405).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  }
}
