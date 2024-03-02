import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType, CreatePostInput } from './types/postType.js';
import { PrismaClient } from '@prisma/client';
import { UserType, CreateUserInput } from './types/userType.js';
import { ProfileType, CreateProfileInput } from './types/profileType.js';
import { UUIDType } from './types/uuid.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInput),
        },
      },
      resolve: async (
        source,
        args: { dto: { title: string, content: string, authorId: string } },
        context: { prisma: PrismaClient },
      ) => {
        const result = await context.prisma.post.create({
          data: args.dto,
        });
        return result;
      },
    },
    createUser: {
      type: UserType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInput),
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
          type: new GraphQLNonNull(CreateProfileInput),
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
    deletePost: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (
        source,
        args: { id: string },
        context: { prisma: PrismaClient },
      ) => {
        const result = await context.prisma.post.delete({
          where: {
            id: args.id
          }
        });
        return result ? true : false;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (
        source,
        args: { id: string },
        context: { prisma: PrismaClient },
      ) => {
        const result = await context.prisma.profile.delete({
          where: {
            id: args.id
          }
        });
        return result ? true : false;
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (
        source,
        args: { id: string },
        context: { prisma: PrismaClient },
      ) => {
        const result = await context.prisma.user.delete({
          where: {
            id: args.id
          }
        });
        return result ? true : false;
      },
    },
  },
});
