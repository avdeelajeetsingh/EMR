import { pool } from "./_db.js";
import { randomUUID } from "crypto";

export default async function handler(req, res) {
  try {
    // ================= GET =================
    if (req.method === "GET") {
      const result = await pool.query(`
        SELECT
          id,
          name,
          doctor_name AS "doctor_name",
          date::text AS date,
          time,
          duration,
          status,
          mode,
          reason
        FROM appointments
        ORDER BY date, time
      `);

      return res.status(200).json(result.rows);
    }

    // ================= POST =================
    if (req.method === "POST") {
      const {
        name,
        doctorName,   // frontend sends this
        date,
        time,
        duration,
        status,
        mode,
        reason,
      } = req.body;

      const result = await pool.query(
        `
        INSERT INTO appointments
          (id, name, doctor_name, date, time, duration, status, mode, reason)
        VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING
          id,
          name,
          doctor_name AS "doctor_name",
          date::text AS date,
          time,
          duration,
          status,
          mode,
          reason
        `,
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

      // 🔥 RETURN CREATED ROW (important)
      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Appointments API error:", err);
    return res.status(500).json({ error: "Database error" });
  }
}
