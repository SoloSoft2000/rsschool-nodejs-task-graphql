import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const PostsType = new GraphQLObjectType({
  name: 'Posts',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});