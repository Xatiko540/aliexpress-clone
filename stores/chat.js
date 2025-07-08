import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { useAuthStore } from './auth'

const socket = io('http://localhost:3000')

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: []
  }),
  actions: {
    init() {
      socket.on('chat_history', (msgs) => {
        this.messages = msgs.map((m) => ({
          from: {
            name: m.user?.username || m.user?.email,
            avatar: m.user?.avatar || ''
          },
          msg: m.message,
          createdAt: m.createdAt,
          isFromAdmin: m.isFromAdmin || false
        }))
      })

      socket.on('chat', (msg) => {
        this.messages.push(msg)
      })
    },

    send(msgText) {
      const auth = useAuthStore()
      if (!auth.user?.id) return

      this.messages.push({
        from: {
          name: auth.user.username || auth.user.email,
          avatar: auth.user.avatar || ''
        },
        msg: msgText,
        createdAt: new Date().toISOString(),
        isFromAdmin: auth.user.role === 'admin' // 💬 ← добавляем роль
      })

      socket.emit('chat', {
        userId: auth.user.id,
        msg: msgText,
        isFromAdmin: auth.user.role === 'admin'
      })
    }
  }
})