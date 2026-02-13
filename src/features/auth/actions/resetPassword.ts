"use server";

import { actionClient } from "@/lib/safe-action";

import { auth } from "@/Utils/auth";
import { resetPasswordSchema } from "../schemas/auth.resetPassword";
import { changePasswordPath } from "@/path";


export const resetPassword = actionClient.inputSchema(resetPasswordSchema).action(async({parsedInput : {email}})=>{

    try {
        await auth.api.requestPasswordReset({
            body :{
                email,
                redirectTo : `http://localhost:3000/auth/change-password`
            }
        });

        return {message : "ResetPassword Success!"};
        
    } catch (error) {
        console.log("Account ResetPassword Error",error);
        throw new Error("Account ResetPassword Error")
    };
        
})