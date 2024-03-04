import { PrismaClient } from '@prisma/client';
import { CreateUserType } from '../types/types.js';

export const createUser = async (
  _,
  args: { dto: CreateUserType },
  context: { prisma: PrismaClient },
) => {
  return await context.prisma.user.create({
    data: args.dto,
  });
};

export const deleteUser = async (
  _,
  args: { id: string },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.user.delete({
    where: {
      id: args.id,
    },
  });
  return result ? true : false;
};

export const changeUser = async (
  _,
  args: { id: string; dto: CreateUserType },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.user.update({
    where: {
      id: args.id,
    },
    data: { id: args.id, ...args.dto },
  });
  return result;
};

export const subscribeTo = async (
  _,
  args: { userId: string; authorId: string },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      userSubscribedTo: {
        create: {
          authorId: args.authorId,
        },
      },
    },
  });
  return result;
};

export const unsubscribeFrom = async (
  _,
  args: { userId: string; authorId: string },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: args.userId,
        authorId: args.authorId,
      },
    },
  });
  return result ? true : false;
};
