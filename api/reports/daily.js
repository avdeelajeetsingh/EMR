import { pool } from "../_db.js";

export default async function handler(req, res) {
  const { date } = req.query;

  const result = await pool.query(
    `
    SELECT status, COUNT(*)::int as count
    FROM appointments
    WHERE date = $1
    GROUP BY status
    `,
    [date]
  );

  res.json(result.rows);
}
