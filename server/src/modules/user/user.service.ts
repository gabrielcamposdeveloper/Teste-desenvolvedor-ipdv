import * as userRepository from './user.repository'
import { User } from '../../models/user.model'
import bcrypt from 'bcrypt'
import { formatarCPF, formatarTelefone } from '../../utils/formatadores'

const SALT_ROUNDS = 10

export const listarUsuarios = async (): Promise<User[]> => {
  return userRepository.getAllUsers()
}

export const buscarUsuarioPorId = async (id: number): Promise<User | null> => {
  return userRepository.getUserById(id)
}

export const criarUsuario = async (
  user: Omit<User, 'id' | 'ativo'> & { senha: string }
): Promise<User> => {
  user.cpf = formatarCPF(user.cpf || '')
  user.telefone = formatarTelefone(user.telefone || '')

  const senhaHash = await bcrypt.hash(user.senha, SALT_ROUNDS)

  const { senha, ...userWithoutSenha } = user

  return userRepository.createUser(
    userWithoutSenha, 
    senhaHash
  )
}

export const atualizarUsuario = async (
  id: number,
  user: Partial<Omit<User, 'id'>>,
  senha?: string
): Promise<User | null> => {
  if (user.cpf) {
    user.cpf = formatarCPF(user.cpf)
  }
  if (user.telefone) {
    user.telefone = formatarTelefone(user.telefone)
  }

  let senhaHash: string | undefined = undefined
  if (senha) {
    senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)
  }

  return userRepository.updateUser(id, user, senhaHash)
}

export const deletarUsuario = async (id: number): Promise<boolean> => {
  return userRepository.deleteUser(id)
}
