import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./profileType.js";
import { PostType } from "./postType.js";
import { Context } from "./loaderType.js";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    profile: {
      type: ProfileType,
      resolve: async (user: { id: string }, args, context: Context) => 
        await context.profileLoader.load(user.id)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user: { id: string }, args, context) =>
        await context.postLoader.load(user.id)
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user: { id: string }, args, context) => 
        await context.userSubscribedToLoader.load(user.id)
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user: { id: string }, args, context) => 
        await context.subscribedToUserLoader.load(user.id)
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
