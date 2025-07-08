import Stripe from 'stripe';
import { defineEventHandler, readBody, getCookie, createError } from 'h3';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const config = useRuntimeConfig();

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);



  // Расширяем: если type === 'topup' → требуем токен и добавляем userId в metadata
  if (body.type === 'topup') {
    const token = getCookie(event, 'auth_token');
    if (!token) throw createError({ statusCode: 401, statusMessage: 'Нет токена' });

    let payload;
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
        throw new Error('Неверный токен');
      }
      payload = decoded;
    } catch {
      throw createError({ statusCode: 401, statusMessage: 'Неверный токен' });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw createError({ statusCode: 401, statusMessage: 'Пользователь не найден' });

    return await stripe.paymentIntents.create({
      amount: Number(body.amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: user.id,
        type: 'topup'
      },
      description: `Пополнение баланса от ${user.email}`
    });
  }

  // Поведение по умолчанию (не сломано!)
  return await stripe.paymentIntents.create({
    amount: Number(body.amount),
    currency: 'usd',
    automatic_payment_methods: { enabled: true }
  });
});