import { prisma } from "@/db/client";
import { sendEmail } from "@/lib/sendEmail";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
        google: { 
          prompt: "select_account",
          clientId: process.env.GOOGLE_CLIENT_ID as string, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      }, 
    },
    emailAndPassword: { 
        enabled: true,
        sendResetPassword: async ({user, url}) => {
            await sendEmail({
              to: user.email,
              subject: "Reset your password",
              resetPasswordLink : url
            });
          },
          onPasswordReset: async ({ user }) => {
            console.log(`Password for user ${user.email} has been reset.`);
          },
      }, 

    plugins : [nextCookies()],
});