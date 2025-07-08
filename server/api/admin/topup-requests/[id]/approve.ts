// server/api/admin/topup-requests/[id]/approve.ts

import { defineEventHandler, createError, getCookie } from 'h3';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Нет токена' });

  const config = useRuntimeConfig();
  let payload: { id: string };

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
      throw new Error('Неверный токен');
    }
    payload = decoded as { id: string };
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Неверный токен' });
  }

  const admin = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!admin || admin.role !== 'admin') throw createError({ statusCode: 403, statusMessage: 'Нет доступа' });

  const id = parseInt((event.context.params as any).id);
  if (isNaN(id)) throw createError({ statusCode: 400, statusMessage: 'Неверный ID' });

  const request = await prisma.topUpRequest.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!request) throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' });
  if (request.status !== 'PENDING') throw createError({ statusCode: 400, statusMessage: 'Заявка уже обработана' });

  await prisma.$transaction([
    prisma.topUpRequest.update({
      where: { id },
      data: { status: 'APPROVED' }
    }),
    prisma.user.update({
      where: { id: request.userId },
      data: { balance: request.user.balance + request.amount }
    }),
    prisma.transaction.create({
      data: {
        userId: request.userId,
        amount: request.amount,
        type: 'topup',
        details: `Одобрено админом ${admin.email}`
      }
    }),
    prisma.activityLog.create({
      data: {
        userId: request.userId,
        action: 'APPROVE_TOPUP',
        meta: JSON.stringify({ admin: admin.email, amount: request.amount })
      }
    })
  ]);

  return {
    success: true,
    message: 'Заявка одобрена и баланс пополнен'
  };
});