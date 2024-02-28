import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  }
});
