import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt }
  }
});
