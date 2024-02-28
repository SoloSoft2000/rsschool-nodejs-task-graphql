import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});