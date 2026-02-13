import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export const gitHubSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
  });
};

export const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
