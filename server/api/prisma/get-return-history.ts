// /server/api/prisma/get-return-history.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const returns = await prisma.returnRequest.findMany({
    include: {
      orderItem: {
        include: {
          product: true,
          order: {
            include: {
              user: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return returns.map((ret: any) => ({
    id: ret.id,
    product: ret.orderItem.product.title,
    user: ret.orderItem.order.user.email,
    status: ret.status,
    amount: ret.amount,
    createdAt: ret.createdAt
  }))
})