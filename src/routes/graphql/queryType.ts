import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypesIdsType, MemberTypesType } from "./types/memberTypes.js";
import { PostsType } from "./types/posts.js";
import { ProfilesType } from "./types/profiles.js";
import { UsersType } from "./types/users.js";
import { PrismaClient } from "@prisma/client";

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberTypesType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.memberType.findMany()
    },
    memberType: {
      type: MemberTypesType,
      args: { id: {type: new GraphQLNonNull(MemberTypesIdsType)} },
      resolve: async (source, args: { id: string }, context: {prisma: PrismaClient}) => await context.prisma.memberType.findUnique({
        where: {
          id: args.id
        }
      })
    },
    posts: {
      type: new GraphQLList(PostsType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.post.findMany()
    },
    post: {
      type: PostsType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      resolve: (source, args: { id: string }, context: {prisma: PrismaClient}) => context.prisma.post.findUnique({
        where: {
          id: args.id
        }
      })
    },
    users: {
      type: new GraphQLList(UsersType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.user.findMany()
    },
    user: {
      type: UsersType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      resolve: (source, args: { id: string }, context: {prisma: PrismaClient}) => context.prisma.user.findUnique({
        where: {
          id: args.id
        }
      })
    },
    profiles: {
      type: new GraphQLList(ProfilesType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.profile.findMany()
    },
    profile: {
      type: ProfilesType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      resolve: (source, args: { id: string }, context: {prisma: PrismaClient}) => context.prisma.profile.findUnique({
        where: {
          id: args.id
        }
      })
    },
  }
});