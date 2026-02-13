import * as z from "zod"

export const changePasswordSchema = z.object({
    password : z.string(),
    token : z.string()
})