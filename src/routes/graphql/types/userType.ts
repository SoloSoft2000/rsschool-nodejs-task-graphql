import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./profileType.js";
import { getProfileByUserId } from "../getsData.js";
import { PrismaClient } from "@prisma/client";
import { PostType } from "./postType.js";


export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    profile: {
      type: ProfileType,
      resolve: (user: { id: string }, args, context: {prisma: PrismaClient}) => getProfileByUserId(user.id, context)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user: { id: string }, args, context: {prisma: PrismaClient}) =>
        context.prisma.post.findMany({
          where: {
            authorId: user.id
          }
        })
    }
  }
});
