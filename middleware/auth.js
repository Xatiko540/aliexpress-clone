export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/checkout')) return

  try {
    const user = await $fetch('/api/user', { credentials: 'include' })
    if (!user) throw new Error('Not authenticated')

  } catch (e) {
    console.error('❌ Middleware: user not authorized', e)
    return navigateTo('/auth')
  }
})