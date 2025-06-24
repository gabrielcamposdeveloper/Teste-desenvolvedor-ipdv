import { db } from '../../config/database'

export const getAllCargos = async () => {
  const { rows } = await db.query('SELECT id, nome FROM cargos ORDER BY nome')
  return rows
}

interface Cargo {
  id: number;
  nome: string;
}

export const createCargo = async (nome: string): Promise<Cargo> => {
  const { rows } = await db.query(
    'INSERT INTO cargos (nome) VALUES ($1) RETURNING id, nome',
    [nome]
  )
  return rows[0] as Cargo;
}


export const updateCargo = async (id: number, nome: string) => {
  const { rows } = await db.query(
    'UPDATE cargos SET nome = $1 WHERE id = $2 RETURNING *',
    [nome, id]
  )
  return rows[0]
}

export const deleteCargo = async (id: number) => {
  await db.query('DELETE FROM cargos WHERE id = $1', [id])
}
