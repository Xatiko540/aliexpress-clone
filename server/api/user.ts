// server/api/user.ts
import { getCookie } from 'h3'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const config = useRuntimeConfig()
  let payload: { id: string }

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
      throw new Error('Invalid token payload')
    }
    payload = decoded as { id: string }
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid Token' })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return {
    id: user.id,
    email: user.email,
    token,
  }
})