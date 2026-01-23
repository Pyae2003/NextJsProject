import Heading from "@/components/Heading";
import PostItems from "@/features/posts/components/PostItems";
import { getPost } from "@/features/posts/queries/get-post";
import { info } from "../../../../generated/prisma/client";
interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await getPost(id) as info;
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
