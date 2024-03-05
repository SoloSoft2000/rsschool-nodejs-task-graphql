import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { MemberType } from './memberType.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { Context } from './types.js';
import { UID } from './types.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { ...UID },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (profile: { memberTypeId: MemberTypeId }, args, context: Context) =>
        await context.memberTypeLoader.load(profile.memberTypeId),
    },
  },
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { ...UID },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});
