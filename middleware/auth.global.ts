// middleware/auth.global.ts

import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  // ⏳ Если уже загружено — не грузим заново
  if (authStore.user !== null) return

  userStore.isLoading = true

  try {
    // Получаем пользователя (сервер читает куку)
    await authStore.fetchUser()
  } catch (e) {
    console.error('❌ Middleware: auth failed', e)
  } finally {
    userStore.isLoading = false
  }

  // 🔐 Пример защиты маршрутов
  if (!authStore.user && ['/checkout', '/orders', '/settings'].includes(to.path)) {
    return navigateTo('/auth')
  }
})