import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./profileType.js";
import { PostType } from "./postType.js";
import { Context, UserTypeWithId } from "./types.js";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    profile: {
      type: ProfileType,
      resolve: async (user: UserTypeWithId, args, context: Context) => 
        await context.profileLoader.load(user.id)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user: UserTypeWithId, args, context) =>
        await context.postLoader.load(user.id)
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user: UserTypeWithId, args, context) => {
        if (user.userSubscribedTo)
          return await context.userLoader.loadMany(user.userSubscribedTo.map((user) => user.authorId))
        return null;
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user: UserTypeWithId, args, context) => {
        if (user.subscribedToUser)
          return await context.userLoader.loadMany(user.subscribedToUser.map((user) => user.subscriberId))
        return null;
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
