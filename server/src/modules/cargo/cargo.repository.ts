import { db } from "../../config/database"

export const getAllCargos = async () => {
  const { rows } = await db.query('SELECT id, nome FROM cargos ORDER BY nome')
  return rows
}
