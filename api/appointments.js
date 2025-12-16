import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        doctor_name AS "doctorName",
        date,
        TO_CHAR(time, 'HH24:MI') AS time,
        duration,
        status,
        mode,
        reason
      FROM appointments
      ORDER BY date, time
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
