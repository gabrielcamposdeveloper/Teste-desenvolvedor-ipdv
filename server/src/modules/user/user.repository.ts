import { db } from '../../config/database'
import { User } from '../../models/user.model'
import { Credencial } from '../../models/credencial.model'
import bcrypt from 'bcrypt'

export const getAllUsers = async (): Promise<User[]> => {
  const { rows } = await db.query<User>(`
    SELECT u.*, c.nome as cargo_nome
    FROM usuarios u
    LEFT JOIN cargos c ON u.cargo_id = c.id
    WHERE u.ativo = TRUE
  `)
  return rows
}

export const getUserById = async (id: number): Promise<User | null> => {
  const { rows } = await db.query<User>(`
    SELECT u.*, c.nome as cargo_nome
    FROM usuarios u
    LEFT JOIN cargos c ON u.cargo_id = c.id
    WHERE u.id = $1 AND u.ativo = TRUE
  `, [id])
  return rows[0] || null
}

export const createUser = async (user: Omit<User, 'id' | 'ativo'>, senha: string): Promise<User> => {
  const client = await db.connect()
  try {
    await client.query('BEGIN')

    const insertUserText = `
      INSERT INTO usuarios (nome, email, cpf, telefone, cargo_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const userResult = await client.query<User>(insertUserText, [
      user.nome,
      user.email,
      user.cpf,
      user.telefone || null,
      user.cargo_id || null
    ])

    const novoUsuario = userResult.rows[0]

    const senhaHash = await bcrypt.hash(senha, 10)

    const insertCredText = `
      INSERT INTO credenciais (usuario_id, senha)
      VALUES ($1, $2)
    `
    await client.query(insertCredText, [novoUsuario.id, senhaHash])

    await client.query('COMMIT')

    return novoUsuario
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export const updateUser = async (id: number, user: Partial<User>, senha?: string): Promise<User | null> => {
  const client = await db.connect()
  try {
    await client.query('BEGIN')

    const updateUserText = `
      UPDATE usuarios
      SET nome = COALESCE($1, nome),
          email = COALESCE($2, email),
          cpf = COALESCE($3, cpf),
          telefone = COALESCE($4, telefone),
          ativo = COALESCE($5, ativo),
          cargo_id = COALESCE($6, cargo_id)
      WHERE id = $7
      RETURNING *
    `
    const userResult = await client.query<User>(updateUserText, [
      user.nome,
      user.email,
      user.cpf,
      user.telefone,
      user.ativo,
      user.cargo_id,
      id
    ])

    if (userResult.rowCount === 0) {
      await client.query('ROLLBACK')
      return null
    }

    if (senha) {
      const senhaHash = await bcrypt.hash(senha, 10)
      await client.query(`UPDATE credenciais SET senha = $1 WHERE usuario_id = $2`, [senhaHash, id])
    }

    await client.query('COMMIT')

    return userResult.rows[0]
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export const deleteUser = async (id: number): Promise<boolean> => {
 
  const { rowCount } = await db.query(
    'UPDATE usuarios SET ativo = FALSE WHERE id = $1 AND ativo = TRUE',
    [id]
  )
  return (rowCount ?? 0) > 0
}
