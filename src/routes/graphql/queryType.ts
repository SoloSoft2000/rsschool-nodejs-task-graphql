import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdType } from './types/memberType.js';
import { PostType } from './types/postType.js';
import { ProfileType } from './types/profileType.js';
import { UserType } from './types/userType.js';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: (source, args, context: { prisma: PrismaClient }) =>
        context.prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdType)}
      },
      resolve: (source, args: { id: string }, context: { prisma: PrismaClient }) =>
        context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        }),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (source, args, context: { prisma: PrismaClient }) =>
        context.prisma.post.findMany(),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (source, args, context: { prisma: PrismaClient }) =>
        context.prisma.user.findMany(),
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: (source, args, context: { prisma: PrismaClient }) =>
        context.prisma.profile.findMany(),
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: (source, args: { id: string }, context: { prisma: PrismaClient }) =>
        context.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        }),
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: (source, args: { id: string }, context: { prisma: PrismaClient }) =>
        context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        }),
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: (source, args: { id: string }, context: { prisma: PrismaClient }) =>
        context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        }),
    },
  },
});
