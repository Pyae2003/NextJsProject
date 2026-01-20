import { ABOUT, POSTS } from "@/path"
import Link from "next/link"
import { Button } from "./ui/button"
import { ModeToggle } from "./theme-toggler"

const Header = () => {
  return (
    <div className="flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-extrabold my-4">Dev.io</Link>
        <div className="space-x-4">
           <Button variant={"link"}>
              <Link href={POSTS}>Posts</Link>
           </Button>
           <Button variant={"link"}>
              <Link href={ABOUT}>About</Link>
           </Button>
           <ModeToggle/>
        </div>
    </div>
  )
}

export default Header;