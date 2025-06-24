import axios from 'axios'

const API_URL = 'http://localhost:3000/api/users'

const getTokenHeader = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`
  }
}

export interface UserPayload {
  nome: string
  email: string
  senha?: string
  cpf?: string
  telefone?: string
  ativo?: boolean
  cargo_id: number
}

export const listarUsuarios = async () => {
  const response = await axios.get(API_URL, {
    headers: getTokenHeader()
  })
  return response.data
}

export const criarUsuario = async (usuario: UserPayload) => {
  const response = await axios.post(API_URL, usuario, {
    headers: getTokenHeader()
  })
  return response.data
}

export const atualizarUsuario = async (id: number, usuario: Partial<UserPayload>) => {
  const response = await axios.put(`${API_URL}/${id}`, usuario, {
    headers: getTokenHeader()
  })
  return response.data
}

export const deletarUsuario = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: getTokenHeader()
  })
  return response.data
}
