'use server'
import { prisma } from "@/db/client"
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePosts = async ( id : string) => {
    await prisma.info.delete(
        {
            where : {
                id
            }
        }
    );
    revalidatePath(POSTS);
    redirect(POSTS);
}