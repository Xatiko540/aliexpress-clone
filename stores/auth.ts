// stores/auth.ts
import { defineStore } from 'pinia'

import { jwtDecode } from 'jwt-decode'



interface UserPayload {
  id: number
  email: string
  iat: number
  exp: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserPayload
  }),
  actions: {
    async fetchUser() {
      const token = useCookie('auth_token').value
      if (!token) {
        this.user = null
        return
      }

      try {
        this.user = jwtDecode<UserPayload>(token)
      } catch {
        this.user = null
      }
    },
    logout() {
      useCookie('auth_token').value = null
      this.user = null
    }
  }
})
