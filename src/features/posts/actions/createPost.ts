"use server";

import { actionClient } from "@/lib/safe-action";

import { postCreateSchema } from "../schema";
import { prisma } from "@/db/client";
import { revalidatePath } from "next/cache";
import { POSTS } from "@/path";
import { getSession } from "@/lib/get-session";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput: { name, content } }) => {
    try {
      const session = await getSession();

      if (!session?.user?.id) {
        throw new Error("Please Login First!");
      }

      const userId = session.user.id; 

      await prisma.info.create({
        data: {
          name,
          content,
          userId: userId,
        },
      });
      revalidatePath(POSTS);
      return { message: "post created!" };

    } catch (error) {
       console.log("Create Post Error ",error);
      throw new Error("Create Post Error");
    }
  });
