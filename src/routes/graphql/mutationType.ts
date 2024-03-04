import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType, CreatePostInput, ChangePostInput } from './types/postType.js';
import { UserType, CreateUserInput, ChangeUserInput } from './types/userType.js';
import {
  ProfileType,
  CreateProfileInput,
  ChangeProfileInput,
} from './types/profileType.js';
import { UUIDType } from './types/uuid.js';
import { changePost, createPost, deletePost } from './resolvers/postResolver.js';
import {
  changeUser,
  createUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
} from './resolvers/userResolver.js';
import {
  changeProfile,
  createProfile,
  deleteProfile,
} from './resolvers/profileResolver.js';

const UID = { type: new GraphQLNonNull(UUIDType) };
const ID = { id: UID };

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: createPost,
    },
    createUser: {
      type: UserType,
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: createUser,
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: createProfile,
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: ID,
      resolve: deletePost,
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: ID,
      resolve: deleteProfile,
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: ID,
      resolve: deleteUser,
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: { dto: { type: new GraphQLNonNull(ChangePostInput) }, ...ID },
      resolve: changePost,
    },
    changeProfile: {
      type: ProfileType,
      args: { dto: { type: new GraphQLNonNull(ChangeProfileInput) }, ...ID },
      resolve: changeProfile,
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: { dto: { type: new GraphQLNonNull(ChangeUserInput) }, ...ID },
      resolve: changeUser,
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { ...UID },
        authorId: { ...UID },
      },
      resolve: subscribeTo,
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        userId: { ...UID },
        authorId: { ...UID },
      },
      resolve: unsubscribeFrom,
    },
  },
});
