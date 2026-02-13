import  * as z from "zod";

export const authBaseSchema = {
    email : z.string(),
    password : z.string().min(10)
}