import { User } from '../../models/user/user.model'
import * as userRepository from './user.repository'


export const listarUsuarios = async (): Promise<User[]> => {
  return userRepository.getAllUsers()
}
