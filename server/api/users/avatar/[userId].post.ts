import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, "userId");

    if (!userId) {
      throw createError({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    const body = await readMultipartFormData(event);

    if (!body || body.length === 0) {
      throw createError({
        statusCode: 400,
        message: "No avatar file uploaded",
      });
    }

    const avatarFile = body[0];

    if (!avatarFile.filename) {
      throw createError({
        statusCode: 400,
        message: "Invalid file upload",
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(avatarFile.type || "")) {
      throw createError({
        statusCode: 400,
        message: "Invalid file type. Only JPEG, PNG and WebP are allowed.",
      });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${avatarFile.filename}`;
    const filepath = path.join(uploadDir, filename);
    const avatarPath = `/uploads/avatars/${filename}`;

    // Save file
    fs.writeFileSync(filepath, avatarFile.data);

    // Get existing avatar path first
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });

    // Update avatar in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarPath },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
      },
    });

    // Delete old avatar if present
    if (existingUser?.avatar && existingUser.avatar !== avatarPath) {
      const oldPath = path.join(process.cwd(), "public", existingUser.avatar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error: any) {
    console.error("Avatar upload error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to upload avatar",
    });
  }
});