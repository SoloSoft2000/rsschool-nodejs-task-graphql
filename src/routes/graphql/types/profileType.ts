import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberType } from "./memberType.js";
import { PrismaClient } from ".prisma/client";
import { getMemberType } from "../getsData.js";
import { MemberTypeId } from "../../member-types/schemas.js";
import { UUIDType } from "./uuid.js";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: (prof: {memberTypeId: MemberTypeId}, args, context: { prisma: PrismaClient }) => {
          return getMemberType(prof.memberTypeId, context)
        }
    }
  }
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType)},
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) }
  }
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }
});
