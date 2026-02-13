import { Button } from "@/components/ui/button";
import { googleSignIn } from "@/lib/auth-client";
import Image from "next/image";

const GoogleForm = () => {
  return (
    <div>
      <Button
        className="google-btn w-full"
        onClick={() => googleSignIn()}
      >
        <Image src="/google.svg" alt="googleLogo" width="20" height={"20"} />
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleForm;
