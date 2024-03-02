import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./profileType.js";
import { getProfileByUserId } from "../getsData.js";
import { PrismaClient } from "@prisma/client";
import { PostType } from "./postType.js";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: (user: { id: string }, args, context: {prisma: PrismaClient}) => {
        return context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: user.id
              }
            }
          }
        })
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: (user: { id: string }, args, context: {prisma: PrismaClient}) => {
        return context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: user.id
              }
            }
          }
        })
      }
    }

  })
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    balance: {type: GraphQLFloat}
  }
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {type: GraphQLString },
    balance: {type: GraphQLFloat}
  }
});
