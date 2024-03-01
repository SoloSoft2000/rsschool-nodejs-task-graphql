import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, validate, parse } from 'graphql';
import { QueryType } from './queryType.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  
  
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
      const valid = validate(schema, parse(query), [depthLimit(5)]);
      
      if (valid.length) {
        return { errors: valid };
      }
      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma }
      })
      return result;
    },
  });
};

export default plugin;
