// server/api/send-email.post.ts
// @ts-ignore
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const info = await transporter.sendMail({
    from: `"AliExpress " <${process.env.SMTP_USER}>`,
    to: body.email,
    subject: body.subject,
    text: body.message,
  })

  return { success: true, messageId: info.messageId }
})