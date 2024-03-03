import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdType } from './types/memberType.js';
import { PostType } from './types/postType.js';
import { ProfileType } from './types/profileType.js';
import { UserType } from './types/userType.js';
import { UUIDType } from './types/uuid.js';
import { getPost, getUser, getProfile, getMemberType } from './getsData.js';
import { Context } from './types/loaderType.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: (source, args, context: Context) =>
        context.prisma.memberType.findMany(),
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeIdType)}
      },
      resolve: (source, args: { id: string }, context) =>
        getMemberType(args.id, context)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (source, args, context) =>
        context.prisma.post.findMany(),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (source, args, context) => {
        const users = context.prisma.user.findMany()
        return users;
      }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: (source, args, context) =>
        context.prisma.profile.findMany(),
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (source, args: { id: string }, context) => 
        getPost(args.id, context)
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: (source, args: { id: string }, context) =>
        getUser(args.id, context)
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (source, args: { id: string }, context) =>
        getProfile(args.id, context)
    }, 
  },
});

