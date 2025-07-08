import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { z } from "zod";
import { readBody, getRouterParam, createError } from "h3";

const prisma = new PrismaClient();

const updateUserSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/).optional(),
  email: z.string().email().max(255).optional(),
  password: z.string().min(6).max(32).optional(),
  role: z.enum(["ADMIN", "USER", "admin", "user"]).transform(val => val.toUpperCase() as "ADMIN" | "USER").optional(),
});

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!id) {
      throw createError({ statusCode: 400, message: "User ID is required" });
    }

    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        message: parsed.error.errors.map(e => e.message).join(", "),
      });
    }

    const data = parsed.data;

    if (Object.keys(data).length === 0) {
      throw createError({ statusCode: 400, message: "No update fields provided" });
    }

    if (data.email || data.username) {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              ...(data.email ? [{ email: data.email.toLowerCase() }] : []),
              ...(data.username ? [{ username: data.username.toLowerCase() }] : []),
            ],
            NOT: {
              id: {
                equals: id,
              },
            },
          },
        });

      if (existingUser) {
        throw createError({
          statusCode: 400,
          message: "Email или username уже используется",
        });
      }
    }

    const updateData: any = {};
    if (data.username) updateData.username = data.username.toLowerCase();
    if (data.email) updateData.email = data.email.toLowerCase();
    if (data.role) updateData.role = data.role;
    if (data.password) updateData.password = await hash(data.password, 10);

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error: any) {
    console.error("❌ Update user error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to update user",
    });
  }
});