import { prisma } from "@/db/client";
import { info, User } from "../../../../generated/prisma/client";
import { searchParams } from "../../../types/searchParams";

export interface getPostProps extends info {
  user: User;
}

export interface PaginatedPosts {
  posts: getPostProps[];
  totalPages : number;
  currentPage: number;
}

export const getPosts = async (

  userId: string | undefined,
  searchParams: searchParams

): Promise<PaginatedPosts> => {

  const POST_PER_PAGE = 2;

  const currentPage = Number(searchParams.page) || 1;

  const skipPage = (currentPage - 1) * POST_PER_PAGE;

  const whereCondition = {
    userId: userId,
    name: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  console.log("User id ", userId);
  //   return await prisma.info.findMany({
  //     orderBy: {
  //       createdAt: searchParams.sort?.toString() === "desc" ? "desc" : "asc",
  //     },
  //     include: {
  //       user: true,
  //     },
  //     where: {
  //       userId: userId,
  //       name: {
  //         contains: searchParams.search,
  //         mode: "insensitive",
  //       },
  //     },
  //   });

  // const [ totalCounts , posts ] = await prisma.$transaction([
  //   prisma.info.count({
  //     where: whereCondition
  //   }),
  //   prisma.info.findMany({
  //     orderBy: {
  //       createdAt: searchParams.sort?.toString() === "desc" ? "desc" : "asc",
  //     },
  //     include: {
  //       user: true,
  //     },
  //     where: whereCondition,
  //     skip : skipPage,
  //     take : POST_PER_PAGE
  //   })
  // ]);

  const totalCounts = await prisma.info.count({
    where: whereCondition,
  });
  
  const posts = await prisma.info.findMany({
    orderBy: {
      createdAt: searchParams.sort?.toString() === "desc" ? "desc" : "asc",
    },
    include: {
      user: true,
    },
    where: whereCondition,
    skip: skipPage,
    take: POST_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCounts / POST_PER_PAGE);

  return {
    posts,
    totalPages,
    currentPage
  }
}
