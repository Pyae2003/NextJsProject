import UpdatePost from '@/features/posts/components/UpdatePost';
import { getPost } from '@/features/posts/queries/get-post';
import { info } from '../../../../../generated/prisma/client';

type updateExitingProps = {
    params : Promise<{id:string}>
}


const page = async ({params} : updateExitingProps)  => {
    const { id } = await params;
    const post = await getPost(id) as info;
  return <UpdatePost  {...post} />
}

export default page