export default defineNuxtRouteMiddleware(async (to) => {
  // 🔐 Проверка: только если заходим на checkout
  if (!to.path.startsWith('/checkout')) return

  try {
    // Кука читается сервером внутри /api/user
    await $fetch('/api/user')
  } catch (e) {
    console.error('❌ Middleware: user not authorized', e)
    return navigateTo('/auth')
  }
})