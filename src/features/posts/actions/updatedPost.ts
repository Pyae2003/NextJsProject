"use server";

import { prisma } from "@/db/client";
import { actionClient } from "@/lib/safe-action";
import { loginPath, POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postUpdateSchema } from "../schema";
import { getSession } from "@/lib/get-session";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id ,name, content,status } }) => {
     const session  = await getSession();
    
        if(!session){
            redirect(loginPath);
        }
    const posts = await prisma.info.findUnique({
        where : { id}
    })

    const owner = await prisma.user.findUnique({
        where : { id : posts?.userId}
    });

    if(!posts || !owner){
        return("Not Authorized!")
    }
    
        await prisma.info.update({
            where : {id},
            data : {
                name,
                content,
                status,
            }
        });

        revalidatePath(POSTS);
        redirect(POSTS);
        

  });
