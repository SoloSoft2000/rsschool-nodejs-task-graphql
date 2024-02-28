import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const ProfilesType = new GraphQLObjectType({
  name: 'Profiles',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  }
});
