import { pool } from "../_db.js";

export default async function handler(req, res) {
  const result = await pool.query(
    `
    SELECT COUNT(*)::int as cancelled
    FROM appointments
    WHERE status = 'Cancelled'
    `
  );

  res.json(result.rows[0]);
}
