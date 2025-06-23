import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth'

export const login = async (email: string, senha: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    senha
  })
  return response.data
}
