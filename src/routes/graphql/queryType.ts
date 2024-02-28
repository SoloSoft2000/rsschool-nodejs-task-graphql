import { GraphQLList, GraphQLObjectType } from "graphql";
import { MemberTypesType } from "./types/memberTypes.js";
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
    posts: {
      type: new GraphQLList(PostsType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.post.findMany()
    },
    users: {
      type: new GraphQLList(UsersType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.user.findMany()
    },
    profiles: {
      type: new GraphQLList(ProfilesType),
      resolve: (source, args, context: {prisma: PrismaClient}) => context.prisma.profile.findMany()
    },
  }
});