import { prisma } from "@/db/client"
import { getPostProps } from "./get-posts"

export const getPost = async (id : string) : Promise<getPostProps | null> => {

    return await prisma.info.findUnique({
        where : {id},

        include : {
            user :true
        }
    })
}