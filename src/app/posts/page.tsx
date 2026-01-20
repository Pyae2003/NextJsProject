import Heading from "@/components/Heading";
import CreatePost from "@/features/posts/components/CreatePost";
import PostLists from "@/features/posts/components/PostLists";
import { Suspense } from "react";

export const dynamic = "force-dynamic"
export default async  function Posts() {
  
  return (
    <>
      <main>
        <Heading title="All Post" description="view all forum posts" />
        <CreatePost/>
        <Suspense>
          <PostLists />
        </Suspense>
      </main>
    </>
  );
}
