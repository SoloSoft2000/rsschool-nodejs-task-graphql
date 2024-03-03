import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Member, Post, Profile, User } from './types/loaderType.js';

export const loaders = (prisma: PrismaClient) => {
  return {
    profileLoader: new DataLoader<string, Profile | undefined>(async (ids) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: [...ids] } },
      });
      return ids.map((id) => profiles.find((profile) => profile.userId === id));
    }),
    postLoader: new DataLoader<string, Post[]>(async (ids) => {
      const posts = await prisma.post.findMany({ where: { authorId: { in: [...ids] } } });
      const result = ids.map((id) => posts.filter((post) => post.authorId === id));
      return result.map((posts) => (posts.length ? posts : []));
    }),
    memberTypeLoader: new DataLoader<string, Member | undefined>(async (ids) => {
      const memberTypes = await prisma.memberType.findMany({
        where: {
          profiles: {
            some: {
              memberTypeId: { in: [...ids] },
            },
          },
        },
      });
      return ids.map((id) => memberTypes.find((type) => type.id === id));
    }),
    userSubscribedToLoader: new DataLoader<string, User[]>(async (ids) => {
      const users = await prisma.user.findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId: { in: [...ids] },
            },
          },
        },
        include: {
          subscribedToUser: true,
        },
      });
      const result = ids.map((id) =>
        users.filter((user) => user.subscribedToUser.some((s) => s.subscriberId === id)),
      );
      return result.map((users) => (users.length ? users : []));
    }),
    subscribedToUserLoader: new DataLoader<string, User[]>(async (ids) => {
      const users = await prisma.user.findMany({
        where: {
          userSubscribedTo: {
            some: {
              authorId: { in: [...ids] },
            },
          },
        },
        include: {
          userSubscribedTo: true,
        },
      });
      const result = ids.map((id) =>
        users.filter((user) => user.userSubscribedTo.some((s) => s.authorId === id)),
      );
      return result.map((users) => (users.length ? users : []));
    }),
  };
};
