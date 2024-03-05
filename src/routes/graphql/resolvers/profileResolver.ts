import { PrismaClient } from '@prisma/client';
import { CreateProfileType, ProfileTypeWithId } from '../types/types.js';

export const createProfile = async (
  _,
  args: { dto: CreateProfileType },
  context: { prisma: PrismaClient },
) => {
  return await context.prisma.profile.create({
    data: args.dto,
  });
};

export const deleteProfile = async (
  _,
  args: { id: string },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.profile.delete({
    where: {
      id: args.id,
    },
  });
  return result ? true : false;
};

export const changeProfile = async (
  _,
  args: { id: string; dto: Partial<ProfileTypeWithId> },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.profile.update({
    where: {
      id: args.id,
    },
    data: args.dto,
  });
  return result;
};
