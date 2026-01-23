'use server'
import { prisma } from "@/db/client"
import { actionClient } from "@/lib/safe-action";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postDeletSchama } from "../schema";

export const deletePosts = actionClient.inputSchema(postDeletSchama).action(async({parsedInput : {id}})=>{
    await prisma.info.delete({
        where : {id}
    });
    revalidatePath(POSTS);
    redirect(POSTS);
})