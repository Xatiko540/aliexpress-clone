// server/api/admin/topup-requests.ts

import { defineEventHandler, getQuery, getCookie, createError } from 'h3';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token');
  if (!authToken) throw createError({ statusCode: 401, statusMessage: 'Нет токена' });

  const config = useRuntimeConfig();

  let payload;
  try {
    payload = jwt.verify(authToken, config.jwtSecret);
    if (!payload || typeof payload !== 'object' || !('id' in payload)) {
      throw new Error('Неверный токен');
    }
  } catch {
    throw createError({ statusCode: 403, statusMessage: 'Нет доступа' });
  }

  const admin = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!admin || admin.role !== 'admin') throw createError({ statusCode: 403, statusMessage: 'Нет доступа' });

  const query = getQuery(event);
  const status = query.status as string;
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED'] as const;
  const whereClause = allowedStatuses.includes(status as any)
    ? { status: status as any }
    : {};

  const [total, requests] = await Promise.all([
    prisma.topUpRequest.count({ where: whereClause }),
    prisma.topUpRequest.findMany({
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
    data: requests
  };
});