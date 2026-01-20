import { prisma } from "@/db/client"
import { Post } from "@/types/post"

export const getPosts = async (id : string) : Promise<Post | null> => {
    return await prisma.info.findUnique({
        where : {id}
    })
}