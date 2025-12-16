import { pool } from "./_db.js";

export default async function handler(req, res) {
  const result = await pool.query(`
    SELECT DISTINCT name
    FROM appointments
    ORDER BY name
  `);
  res.json(result.rows);
}
