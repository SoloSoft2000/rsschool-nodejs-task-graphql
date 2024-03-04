import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';

export type CreatePostType = {
  title: string;
  content: string;
  authorId: string;
};

export interface PostTypeWithId extends CreatePostType {
  id: string;
}

export type CreateProfileType = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
};

export interface ProfileTypeWithId extends CreateProfileType {
  id: string;
}

export type Member = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};

export type CreateUserType = {
  name: string;
  balance: number;
};

export interface UserTypeWithId extends CreateUserType {
  id: string;
  userSubscribedTo: { authorId: string }[];
  subscribedToUser: { subscriberId: string }[];
}

export type Context = {
  prisma: PrismaClient;
  userLoader: DataLoader<string, UserTypeWithId>;
  postLoader: DataLoader<string, PostTypeWithId[]>;
  profileLoader: DataLoader<string, ProfileTypeWithId>;
  memberTypeLoader: DataLoader<string, Member>;
};

export const UID = { type: new GraphQLNonNull(UUIDType) };