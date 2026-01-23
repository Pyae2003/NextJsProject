"use server";

import { actionClient } from "@/lib/safe-action";

import { postCreateSchema } from "../schema";
import { prisma } from "@/db/client";
import { revalidatePath } from "next/cache";
import { POSTS } from "@/path";


export const createPost = actionClient.inputSchema(postCreateSchema).action(async({parsedInput : {name,content}})=>{

    try {
        await prisma.info.create({
            data : {
                name ,
                content,
            }
        });
        revalidatePath(POSTS);
        return {message : "post created!"};
        
    } catch (error) {
        throw new Error("Create Post Error")
    }

})