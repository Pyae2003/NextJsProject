import * as z from "zod"

export const postUpdateSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    content: z.string().min(5),
    status: z.enum(["DONE", "IN_PROGRESS"]),
})