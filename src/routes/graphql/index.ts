import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLList, GraphQLObjectType, GraphQLSchema, graphql } from 'graphql';
import { MemberTypesType } from './types/memberTypes.js';
import { PostsType } from './types/posts.js';
import { UsersType } from './types/users.js';
import { ProfilesType } from './types/profiles.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      memberTypes: {
        type: new GraphQLList(MemberTypesType),
        resolve: () => prisma.memberType.findMany()
      },
      memberType: {
        type: new GraphQLList(MemberTypesType),
        resolve: (_, args: {id: string}) => prisma.memberType.findUnique({
          where: {
            id: args.id
          }
        })
      },
      posts: {
        type: new GraphQLList(PostsType),
        resolve: () => prisma.post.findMany()
      },
      post: {
        type: new GraphQLList(PostsType),
        resolve: (_, args: {id: string}) => prisma.post.findUnique({
          where: {
            id: args.id
          }
        })
      },
      users: {
        type: new GraphQLList(UsersType),
        resolve: () => prisma.user.findMany()
      },
      user: {
        type: new GraphQLList(UsersType),
        resolve: (_, args: {id: string}) => prisma.user.findUnique({
          where: {
            id: args.id
          }
        })
      },
      profiles: {
        type: new GraphQLList(ProfilesType),
        resolve: () => prisma.profile.findMany()
      },
      profile: {
        type: new GraphQLList(ProfilesType),
        resolve: (_, args: {id: string}) => prisma.profile.findUnique({
          where: {
            id: args.id
          }
        })
      },
    }
  });
  
  const schema = new GraphQLSchema({ query: QueryType });
  
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      
      const { query, variables } = req.body;
      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: prisma
      })
      return result;
    },
  });
};

export default plugin;
