// server/api/admin/withdrawals.ts

import { defineEventHandler, getCookie, getQuery, createError } from 'h3';
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

  const query = getQuery(event);
  const statusParam = query.status as string;
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED'] as const;
  const whereClause = allowedStatuses.includes(statusParam as any)
    ? { status: statusParam as any }
    : {};

  const [total, withdrawals] = await Promise.all([
    prisma.withdrawal.count({ where: whereClause }),
    prisma.withdrawal.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { user: true }
    })
  ]);

  return {
    success: true,
    page,
    total,
    pages: Math.ceil(total / limit),
    data: withdrawals
  };
});