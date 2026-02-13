import Heading from "@/components/Heading";
import PostLists from "@/features/posts/components/PostLists";
import { Suspense } from "react";
const Home = () => {
  return (
    <div>
      <main>
        <Heading title="All Post" description="view all forum posts" />
        <Suspense fallback={<p className="text-white"> Fetching posts ...</p>}>
          <PostLists   />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
