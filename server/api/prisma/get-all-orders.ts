import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        created_at: 'desc'
      },
      include: {
        user: true,
        orderItem: {
          include: {
            product: true
          }
        }
      }
    })
    return orders
  } catch (error) {
    console.error('❌ Ошибка получения заказов:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Ошибка сервера при получении заказов'
    })
  }
})