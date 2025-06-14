import { defineStore } from 'pinia'

interface UserPayload {
  id: string 
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserPayload,
    token: null as string | null,
    isInitialized: false
  }),
  actions: {
    async fetchUser() {
      try {
        const user = await $fetch('/api/user')
        console.log('✅ [authStore] fetchUser() user:', user)

        this.user = { id: user.id, email: user.email }
        this.token = user.token ?? null
      } catch (err) {
        console.error('❌ Ошибка при получении пользователя:', err)
        this.user = null
        this.token = null
      } finally {
        this.isInitialized = true
      }
    },
    logout() {
      document.cookie = 'auth_token=; Max-Age=0; path=/;'
      this.user = null
      this.token = null
    }
  },
  persist: true
})