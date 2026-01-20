import Heading from "@/components/Heading";
import PostItems from "@/features/posts/components/PostItems";
import { getPosts } from "@/features/posts/queries/get-post";
interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getPosts(id);
  if(!data){
    return <div>Post not found</div>;
  }
  return (
    <div>
      <Heading title="Post Details" description="" />
      <PostItems {...data} isCard={false}/>
    </div>
  );
};

export default page;
