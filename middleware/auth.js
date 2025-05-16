import jwt from 'jsonwebtoken'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token').value
  const config = useRuntimeConfig()


  if (!token && to.path.startsWith('/admin')) {
    return navigateTo('/auth')
  }

  try {
    jwt.verify(token, config.jwtSecret)
  } catch {
    return navigateTo('/auth')
  }
})