import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdType } from './types/memberType.js';
import { PostType } from './types/postType.js';
import { ProfileType } from './types/profileType.js';
import { UserType } from './types/userType.js';
import { UUIDType } from './types/uuid.js';
import { getPost, getProfile, getMemberType } from './getsData.js';
import { Context } from './types/types.js';
import { getUsers } from './resolvers/userResolver.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (source, args, context: Context) => await context.prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdType) },
      },
      resolve: async (source, args: { id: string }, context) => await getMemberType(args.id, context),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, args, context) => await context.prisma.post.findMany(),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: getUsers,
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (source, args, context) => await context.prisma.profile.findMany(),
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args: { id: string }, context) => await getPost(args.id, context),
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args: { id: string }, context) =>
        await context.userLoader.load(args.id),
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (source, args: { id: string }, context) =>
        await getProfile(args.id, context),
    },
  },
});
