import axios from 'axios'

const API_URL = 'http://localhost:3000/api/cargos'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const listarCargos = async () => {
  const response = await axios.get(API_URL, getAuthHeaders())
  return response.data
}

export const criarCargo = async (nome: string) => {
  const response = await axios.post(API_URL, { nome }, getAuthHeaders())
  return response.data
}

export const atualizarCargo = async (id: number, nome: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { nome }, getAuthHeaders())
  return response.data
}

export const deletarCargo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders())
  return response.data
}
