export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  // Дождаться инициализации
  if (!authStore.isInitialized) {
    userStore.isLoading = true
    try { await authStore.fetchUser() } finally { userStore.isLoading = false }
  }

  try {
    await authStore.fetchUser()
  } catch (e) {
    console.error('❌ Middleware: auth failed', e)
  } finally {
    userStore.isLoading = false
  }

  if (!authStore.user) {
    return redirectIfNeeded(to)
  }
})

// 🔐 вынеси проверку в функцию
function redirectIfNeeded(to: any) {
  const protectedPaths = [
    '/checkout', '/orders', '/settings', '/admin',
    '/admin/bonuses', '/admin/buybacks', '/admin/categories', '/admin/clients',
    '/admin/create', '/admin/history', '/admin/index', '/admin/levels',
    '/admin/login', '/admin/manual', '/admin/manualbuybacks', '/admin/orders',
    '/admin/payments', '/admin/products', '/admin/referrals', '/admin/reports',
    '/admin/reviews', '/admin/sales-report', '/admin/stats', '/admin/transactions',
    '/admin/withdrawals', '/admin/users'
  ]

  if (protectedPaths.includes(to.path)) {
    if (process.client) {
      sessionStorage.setItem('redirectAfterAuth', to.fullPath)
    }
    return navigateTo('/auth')
  }
}