import * as z from "zod"

export const postBaseSchema = ({
    name : z.string().min(2),
    content : z.string().min(5),
})