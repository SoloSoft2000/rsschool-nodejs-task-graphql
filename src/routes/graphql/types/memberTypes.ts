import { GraphQLEnumType, GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";

export const MemberTypesIdsType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeId.BASIC]: {
      value: MemberTypeId.BASIC
    },
    [MemberTypeId.BUSINESS]: {
      value: MemberTypeId.BUSINESS
    },
  }
});

export const MemberTypesType = new GraphQLObjectType({
  name: 'MemberTypes',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypesIdsType) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLString }
  }
});

