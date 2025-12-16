import { pool } from "../_db.js";

export default async function handler(req, res) {
  const { start_date } = req.query;

  const result = await pool.query(
    `
    SELECT date, COUNT(*)::int as count
    FROM appointments
    WHERE date >= $1
    GROUP BY date
    ORDER BY date
    `,
    [start_date]
  );

  res.json(result.rows);
}
