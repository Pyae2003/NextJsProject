'use server'
import { prisma } from "@/db/client"
import { actionClient } from "@/lib/safe-action";
import { loginPath, POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postDeletSchama } from "../schema";
import { getSession } from "@/lib/get-session";

export const deletePosts = actionClient.inputSchema(postDeletSchama).action(async({parsedInput : {id}})=>{
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
    
    await prisma.info.delete({
        where : {id}
    });
    revalidatePath(POSTS);
    redirect(POSTS);
})