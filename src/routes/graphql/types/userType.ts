import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt }
  }
});
