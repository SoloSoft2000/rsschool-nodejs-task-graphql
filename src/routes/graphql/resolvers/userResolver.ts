import { Context, CreateUserType } from '../types/types.js';
import { ResolveTree, parseResolveInfo, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';
import { UserType } from '../types/userType.js';
import { GraphQLResolveInfo } from 'graphql';

export const createUser = async (
  _,
  args: { dto: CreateUserType },
  context: Context,
) => {
  return await context.prisma.user.create({
    data: args.dto,
  });
};

export const deleteUser = async (
  _,
  args: { id: string },
  context: Context,
) => {
  const result = await context.prisma.user.delete({
    where: {
      id: args.id,
    },
  });
  return result ? true : false;
};

export const changeUser = async (
  _,
  args: { id: string; dto: CreateUserType },
  context: Context,
) => {
  const result = await context.prisma.user.update({
    where: {
      id: args.id,
    },
    data: { id: args.id, ...args.dto },
  });
  return result;
};

export const subscribeTo = async (
  _,
  args: { userId: string; authorId: string },
  context: Context,
) => {
  const result = await context.prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      userSubscribedTo: {
        create: {
          authorId: args.authorId,
        },
      },
    },
  });
  return result;
};

export const unsubscribeFrom = async (
  _,
  args: { userId: string; authorId: string },
  context: Context,
) => {
  const result = await context.prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: args.userId,
        authorId: args.authorId,
      },
    },
  });
  return result ? true : false;
};

export const getUsers = async (source, args, context: Context, resolveInfo: GraphQLResolveInfo) => {
  const parsedResolveInfoFragment = parseResolveInfo(resolveInfo) as ResolveTree;
  const { fields }: { fields: { [key in string]: ResolveTree } } =
    simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, UserType);
  const users = await context.prisma.user.findMany({
    include: {
      userSubscribedTo: !!fields.userSubscribedTo,
      subscribedToUser: !!fields.subscribedToUser,
    },
  });

  users.forEach((user) => context.userLoader.prime(user.id, user));
  return users;
}