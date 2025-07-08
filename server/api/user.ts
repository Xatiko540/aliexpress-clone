// server/api/user.ts
import { getCookie, send } from 'h3'
import { PrismaClient } from '@prisma/client'
// @ts-ignore
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {


  
  const token = getCookie(event, 'auth_token')

  if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  if (!token) return null;

  const config = useRuntimeConfig()

  // ⛔️ Неавторизованный — на клиенте просто null, на сервере — ошибка
  if (!token) {
    if (event.node.req.headers.accept?.includes('text/html')) {
      // для браузера (HTML), считаем как гость
      return null
    }
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  let payload: { id: string }

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
      throw new Error('Invalid token payload')
    }
    payload = decoded as { id: string }
  } catch (err) {
    if (event.node.req.headers.accept?.includes('text/html')) {
      return null
    }
    throw createError({ statusCode: 401, statusMessage: 'Invalid Token' })
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username || '',
    avatar: user.avatar || '',
    role: user.role || 'user', // 🛠 ДОБАВЛЕНО
    token,
  }
})