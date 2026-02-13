"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/Utils/auth";
import { changePasswordSchema } from "../schemas/auth.changePassword";


export const changePassword = actionClient.inputSchema(changePasswordSchema).action(async({parsedInput : {password,token}})=>{

    try {
        await auth.api.resetPassword({
            body :{
                newPassword : password,
                token
            }
        });

        return {message : "Change Password Success!"};
        
    } catch (error) {
        console.log("Account Change Password Error",error);
        throw new Error("Account Change Password Error")
    };
        
})