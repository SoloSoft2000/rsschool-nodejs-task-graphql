import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export type Post = {
  id: string,
  title: string,
  content: string
}

export type Profile = {
  id: string,
  isMale: boolean,
  yearOfBirth: number,
  memberTypeId: string,
  userId: string
}

export type Member = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export type User = {
  id: string;
  name: string;
  balance: number;
}

export type Context = {
  prisma: PrismaClient,
  userLoader: DataLoader<string, User>,
  postLoader: DataLoader<string, Post>,
  profileLoader: DataLoader<string, Profile>,
  memberTypeLoader: DataLoader<string, Member>
};
