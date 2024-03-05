import { PrismaClient } from '@prisma/client';
import { CreatePostType, PostTypeWithId } from '../types/types.js';

export const createPost = async (
  _,
  args: { dto: CreatePostType },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.post.create({ data: args.dto });
  return result;
};

export const deletePost = async (
  _,
  args: { id: string },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.post.delete({ where: { id: args.id } });
  return result ? true : false;
};

export const changePost = async (
  _,
  args: { id: string; dto: Partial<PostTypeWithId> },
  context: { prisma: PrismaClient },
) => {
  const result = await context.prisma.post.update({
    where: { id: args.id },
    data: args.dto,
  });
  return result;
};
