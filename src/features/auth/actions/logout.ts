"use server";

import { auth } from "@/Utils/auth";
import { redirect } from "next/navigation";
import { POSTS } from "@/path";
import { headers } from "next/headers";


export const logout = async()=>{

    try {
        await auth.api.signOut({
            headers : await headers()
        })
        
    } catch (error) {
        console.log("Account Logout Error",error);
        throw new Error("Account Logout Error")
    };

    redirect(POSTS);

};