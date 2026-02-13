import Heading from "@/components/Heading";
import CreatePost from "@/features/posts/components/CreatePost";
import PostLists from "@/features/posts/components/PostLists";
import { getSession } from "@/lib/get-session";
import { loginPath } from "@/path";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic"
export default async  function Posts() {

  const session = await getSession();
  if(!session){
    redirect(loginPath);
  }
  
  return (
    <>
      <main>
        <Heading title={session.user.name} description="view all your forum posts" />
        <CreatePost/>
        <Suspense fallback={<p className="text-white"> Fetching posts ...</p>} >
          <PostLists userId={session.user.id}  />
        </Suspense>
      </main>
    </>
  );
}
