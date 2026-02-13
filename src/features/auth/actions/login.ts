"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/Utils/auth";
import { authSignInSchema } from "../schemas/auth.sign-in";


export const login = actionClient.inputSchema(authSignInSchema).action(async({parsedInput : {email,password}})=>{

    try {
        await auth.api.signInEmail({
            body :{
                email,
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