import { ZodError } from "zod"

export type ActionState = {
    message : string,
    payload : FormData
}

export const formStateFitter  = (error : unknown , formData : FormData) : ActionState => {
    if ( error instanceof ZodError || error instanceof Error){
        return {
            message : error.message,
            payload : formData
        }
    }else{
        return{
            message : "unknow Error",
            payload : formData
        }
    }
}