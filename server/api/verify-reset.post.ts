// server/api/verify-reset.post.ts


import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const { email, code, newPassword } = await readBody(event)
    const normalizedEmail = email.trim().toLowerCase()

    const record = await prisma.passwordResetCode.findFirst({
      where: { email: normalizedEmail, code },
    })

    if (!record || record.expiresAt < new Date()) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid or expired code' })
    }

    const hashed = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { password: hashed },
    })

    await prisma.passwordResetCode.delete({ where: { id: record.id } })

    return { success: true }
  } catch (err: any) {
    console.error('❌ verify-reset error:', err)
    throw createError({ statusCode: 500, statusMessage: err.message || 'verify-reset failed' })
  }
})