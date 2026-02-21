import Heading from "@/components/Heading";
import PostLists from "@/features/posts/components/PostLists";
import { searchParams } from "@/types/searchParams";
import { Suspense } from "react";

type HomeProps = {
  searchParams : Promise<searchParams>
}
const Home = async ({searchParams} : HomeProps) => {
  return (
    <div>
      <main>
        <Heading title="All Post" description="view all forum posts" />
        <Suspense fallback={<p className="text-white"> Fetching posts ...</p>}>
          <PostLists  searchParams={await searchParams} />
        </Suspense>
      </main>
    </div>
  );
};

export default Home;
