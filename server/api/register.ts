// server/api/register.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email.trim().toLowerCase()
  const { password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw createError({ statusCode: 400, statusMessage: 'User already exists' })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
    }
  })

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  const info = await transporter.sendMail({
    from: `"AliExpress " <${config.smtpUser}>`,
    to: email,
    subject: 'Welcome!',
    text: `🎉 Thank you for registering, ${email}! We are glad to see you on AliExpress.`,
  })

  console.log('📨 Sent registration email:', info.messageId)

  return {
    success: true,
    message: 'User registered and email sent',
    user: {
      id: user.id,
      email: user.email
    }
  }
})