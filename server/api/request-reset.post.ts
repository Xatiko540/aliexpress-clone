// server/api/request-reset.post.ts
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
const rawEmail = await readBody(event)
const email = rawEmail.email.trim().toLowerCase()
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  const config = useRuntimeConfig()

  await prisma.passwordResetCode.create({
    data: {
      email,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 минут
    },
  })

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  await transporter.sendMail({
    from: `"AliExpress " <${config.smtpUser}>`,
    to: email,
    subject: 'Password Reset Code',
    text: `Your code: ${code}`,
  })

  return { success: true }
})