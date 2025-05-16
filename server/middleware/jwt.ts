import jwt from 'jsonwebtoken'
const { verify } = jwt

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  const config = useRuntimeConfig()

  if (!token) return

  try {
    const decoded = verify(token, config.jwtSecret)
    event.context.user = decoded
  } catch (err) {
    console.error('[JWT] Ошибка верификации токена:', err.message)
  }
})