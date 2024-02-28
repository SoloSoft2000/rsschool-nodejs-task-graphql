import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const MemberTypesType = new GraphQLObjectType({
  name: 'MemberTypes',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLString }
  }
});
