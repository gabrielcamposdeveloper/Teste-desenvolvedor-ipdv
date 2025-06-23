import { User } from "../../models/user/user.model"
import { db } from '../../config/database';

export const getAllUsers = async (): Promise<User[]> => {
  const { rows } = await db.query<User>('SELECT id, nome, email FROM usuarios ORDER BY nome')
  return rows
}
