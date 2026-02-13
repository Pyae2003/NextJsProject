"use server";

import { actionClient } from "@/lib/safe-action";
import { authSignUpSchema } from "../schemas/auth.sign-up";
import { auth } from "@/Utils/auth";



export const register = actionClient.inputSchema(authSignUpSchema).action(async({parsedInput : {name,email,password}})=>{

    try {
        await auth.api.signUpEmail({
            body :{
                email,
                name,
                password
            }
        });

        return {
            success : true,
            error : null
        }
        
    } catch (error: unknown) {
        console.log("Account Registration Error", error);
      
        let errorMessage = "Something went wrong.";
      
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      
        return {
          success: false,
          error: errorMessage
        };
      }
})