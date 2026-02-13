import { loginPath, POSTS, registerPath } from "@/path";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggler";

import { logout } from "@/features/auth/actions/logout";
import { getSession } from "@/lib/get-session";

const Header = async () => {
  const session = await getSession();

  return (
    <div className="flex items-center justify-between">
      <Link href={"/"} className="text-2xl font-extrabold my-4">
        Dev.io
      </Link>
      <div className="flex items-center justify-center space-x-4">
        {session ? <LogoutButton /> : <LoginAndRegisterButton />}
        <ModeToggle />
      </div>
    </div>
  );
};

const LoginAndRegisterButton = async () => {
  return (
    <div className="space-x-2">
      <Button variant={"default"} size={"sm"}>
        <Link href={registerPath}>Register</Link>
      </Button>
      <Button variant={"outline"} size={"sm"}>
        <Link href={loginPath}>Login</Link>
      </Button>
    </div>
  );
};

const LogoutButton = () => {
  return (
    <div className="flex space-x-2">
      <Button variant={"link"}>
        <Link href={POSTS}>My Posts</Link>
      </Button>
      <form action={logout}>
        <Button
          variant={"destructive"}
          size={"sm"}
          className="cursor-pointer"
          type={"submit"}
        >
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Header;
