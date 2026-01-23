import { prisma } from "@/db/client"
import { Post } from "@/types/post"

export const getPost = async (id : string) : Promise<Post | null> => {
    return await prisma.info.findUnique({
        where : {id}
    })
}