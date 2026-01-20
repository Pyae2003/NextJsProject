"use server";

import { prisma } from "@/db/client";
import { POSTS } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async(formData : FormData) => {
    const data = {
        name : formData.get("name"),
        content : formData.get("content")
    };



    await prisma.info.create({
        data : {
            name : data.name as string,
            content : data.content as string
        }
    });

    revalidatePath(POSTS);
    redirect(POSTS);
}