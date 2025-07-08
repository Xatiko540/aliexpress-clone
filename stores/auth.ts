import { defineStore } from 'pinia'

interface UserPayload {
  id: string 
  email: string
  avatar?: string
  username?: string
  role?: string
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
          const user = await $fetch('/api/user', { credentials: 'include' })
          if (!user) throw new Error('Пользователь не найден или не авторизован')

          console.log('✅ [authStore] fetchUser() user:', user)

            this.user = {
            id: user.id,
            email: user.email,
            avatar: user.avatar || '',
            username: user.username || '',
            role: user.role || 'user'
          } as UserPayload
          this.token = user.token ?? null
        } catch (err) {
          // console.error('❌ Ошибка при получении пользователя:', err)
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
      // Очистить Pinia-состояние
      this.$reset()
      // Дополнительно удалить из localStorage, если persist использует его
      localStorage.removeItem('auth')

    }
  },
  persist: true
})