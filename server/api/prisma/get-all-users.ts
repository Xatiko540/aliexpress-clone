import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const result = await Promise.all(users.map(async (user) => {
    const orders = await prisma.orders.findMany({ where: { userId: user.id } })
    return {
      id: user.id,
      phone: user.email.split('@')[0], // или другое поле, если есть phone
      agent: 'Omi99', // заглушка
      level: 1, // заглушка
      balance: orders.length * 10000, // пример расчета
      points: 90, // заглушка
      orders: orders.length,
      date: user.createdAt.toISOString().split('T')[0],
      status: 'Норм'
    }
  }))

  return result
})