import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    async login(email: string, senha: string) {
      const response = await axios.post('/api/auth/login', { email, senha })
      const token = response.data.token

      this.token = token
      const expirationTime = Date.now() + 60 * 60 * 1000
      localStorage.setItem('token', token)
      localStorage.setItem('token_expiration', expirationTime.toString())
    },

    logout() {
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('token_expiration')
    },

    checarExpiracao() {
      const expiration = localStorage.getItem('token_expiration')
      if (!expiration) return false
      return Date.now() > Number(expiration)
    }
  }
})
