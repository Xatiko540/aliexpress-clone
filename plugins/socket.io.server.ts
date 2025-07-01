import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const event = nuxtApp.ssrContext?.event

  // Force any to silence TS on private runtime hooks
  const nodeServer = event?.node as any

  // Prevent multiple registrations
  if (!nodeServer?.res?.socket?.server || nodeServer.__io_attached) return
  nodeServer.__io_attached = true

  const prisma = new PrismaClient()
  const io = new Server(nodeServer.res.socket.server, {
    cors: { origin: '*' }
  })

  io.on('connection', async (socket) => {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { user: true }
    })

    socket.emit('chat_history', messages.reverse())

    socket.on('chat', async (data) => {
      const saved = await prisma.chatMessage.create({
        data: {
          userId: data.userId,
          message: data.msg,
          isFromAdmin: data.isFromAdmin || false
        },
        include: { user: true }
      })

      io.emit('chat', {
        from: {
          name: saved.user.username || saved.user.email,
          avatar: saved.user.avatar
        },
        msg: saved.message,
        createdAt: saved.createdAt,
        isFromAdmin: saved.isFromAdmin
      })
    })
  })
})