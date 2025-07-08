import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, productId, country, city, address, zipcode } = body

  if (!userId || !productId || !country || !city || !address || !zipcode) {
    return {
      statusCode: 400,
      statusMessage: '❌ Отсутствуют обязательные поля',
    }
  }

  const product = await prisma.products.findUnique({
    where: { id: Number(productId) },
  })

  if (!product) {
    return {
      statusCode: 404,
      statusMessage: '❌ Товар не найден',
    }
  }

  const order = await prisma.orders.create({
    data: {
      userId,
      stripeId: 'manual',
      name: product.title,
      country,
      city,
      address,
      zipcode,
      orderItem: {
        create: [{ productId: Number(productId) }],
      },
    },
    include: {
      orderItem: true,
    },
  })

  return {
    success: true,
    order,
  }
})