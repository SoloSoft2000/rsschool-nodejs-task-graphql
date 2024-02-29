import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./profileType.js";
import { getProfile } from "../getsData.js";
import { PrismaClient } from "@prisma/client";


export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    profile: {
      type: ProfileType,
      resolve: (user: { id: string }, args, context: {prisma: PrismaClient}) => getProfile(user.id, context)
    }
  }
});
