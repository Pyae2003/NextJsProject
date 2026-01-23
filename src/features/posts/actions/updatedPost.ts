"use server";

import { prisma } from "@/db/client";
import { actionClient } from "@/lib/safe-action";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postUpdateSchema } from "../schema";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id ,name, content,status } }) => {
  

        await prisma.info.update({
            where : {id},
            data : {
                name,
                content,
                status
            }
        });

        revalidatePath(POSTS);
        redirect(POSTS);
        

  });
