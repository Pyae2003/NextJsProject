import { prisma } from "@/db/client"
import { Post } from "@/types/post"

export const getPosts = () : Promise<Post[]> => {
   return prisma.info.findMany(
     {
        orderBy : {
            createdAt : "desc"
        }
     }
   )
}