import axios from 'axios'

const API_URL = 'http://localhost:3000/api/cargos'

export const listarCargos = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const criarCargo = async (nome: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(API_URL, { nome }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
