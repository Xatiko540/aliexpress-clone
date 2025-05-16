// server/api/register.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    return createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return createError({ statusCode: 400, statusMessage: 'User already exists' })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    }
  })

  return {
    success: true,
    message: 'User registered',
    user: {
      id: user.id,
      email: user.email
    }
  }
})