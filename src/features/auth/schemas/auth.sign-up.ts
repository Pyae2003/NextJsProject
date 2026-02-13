import * as z from "zod"
import { authBaseSchema } from "./auth.base"

export const authSignUpSchema = z.object({
    ...authBaseSchema,
    name : z.string().min(5,"Name must be at least 5 letters!"),
    comfirmPassword : z.string().min(10),
}).superRefine(({comfirmPassword,password},ctx)=>{
    if(password !== comfirmPassword){
        ctx.addIssue({
            code : "custom",
            message : "Password not match!",
            path : ["comfirmPassword"]
        })
    }
})