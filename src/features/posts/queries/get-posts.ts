import { prisma } from "@/db/client"
import { info, User } from "../../../../generated/prisma/client"

export interface getPostProps extends info {
   user : User,
}

export const getPosts = async(userId : string | undefined) : Promise<getPostProps[]> => {
   console.log("User id ", userId);
   return await prisma.info.findMany(
      {
         orderBy : {
             createdAt : "desc"
         },
         include : {
          user : true
         },
         where : {
            userId : userId,
         },
      }
    )
}