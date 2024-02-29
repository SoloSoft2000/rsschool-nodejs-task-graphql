import { PrismaClient } from '@prisma/client';

export const getMemberType = async (id: string, context: { prisma: PrismaClient}) => {
  const result = await context.prisma.memberType.findUnique({
    where: {
      id,
    },
  })
  return result;
}

export const getProfile = async (argsid: string, context: { prisma: PrismaClient }) => {
  const result = await context.prisma.profile.findUnique({
      where: {
        id: argsid,
      },
    });
  return result;
};

export const getProfileByUserId = async (argsid: string, context: { prisma: PrismaClient }) => {
  const result = await context.prisma.profile.findUnique({
      where: {
        userId: argsid,
      },
    });
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
