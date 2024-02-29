import { PrismaClient } from '@prisma/client';

export const getProfile = async (id: string, context: { prisma: PrismaClient }) => {
  const result =
    (await context.prisma.profile.findUnique({
      where: {
        id,
      },
    })) || null;
  return result;
};

export const getUser = async (id: string, context: { prisma: PrismaClient }) => {
  const result =
    (await context.prisma.user.findUnique({
      where: {
        id,
      },
    })) || null;
  return result;
};

export const getPost = async (id: string, context: { prisma: PrismaClient }) => {
  const result =
    (await context.prisma.post.findUnique({
      where: {
        id,
      },
    })) || null;
  return result;
};
