import Heading from "@/components/Heading";
import PostItems from "@/features/posts/components/PostItems";
import { getPost } from "@/features/posts/queries/get-post";
import { info } from "../../../../generated/prisma/client";
import { getPostProps } from "@/features/posts/queries/get-posts";
interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getPost(id) as getPostProps;
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
