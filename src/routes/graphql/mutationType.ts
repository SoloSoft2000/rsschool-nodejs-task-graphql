import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType, newPost } from './types/postType.js';
import { PrismaClient } from '@prisma/client';
import { UserType, newUser } from './types/userType.js';
import { ProfileType, newProfile } from './types/profileType.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: {
        dto: {
          type: new GraphQLNonNull(newPost),
        },
      },
      resolve: (
        source,
        args: { dto: { title: string, content: string, authorId: string } },
        context: { prisma: PrismaClient },
      ) => {
        return context.prisma.post.create({
          data: args.dto,
        });
      },
    },
    createUser: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: UserType,
      args: {
        dto: {
          type: new GraphQLNonNull(newUser),
        },
      },
      resolve: (
        source,
        args: { dto: { name: string, balance: number } },
        context: { prisma: PrismaClient },
      ) => {
        return context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: {
          type: new GraphQLNonNull(newProfile),
        },
      },
      resolve: (
        source,
        args: { dto: { isMale: boolean,
          yearOfBirth: number,
          memberTypeId: string,
          userId: string } },
        context: { prisma: PrismaClient },
      ) => {
        return context.prisma.profile.create({
          data: args.dto,
        });
      },
    },
  }),
});
