"use server"

import { getPostProps, getPosts } from "../queries/get-posts"
import PostItems from "./PostItems"

type options = {
  userId : string | undefined;
}

const PostLists = async ({userId = undefined} : options) => {
  
  const data = await getPosts(userId) as getPostProps[];
  
  return (
    <>
     {data &&
        data.map((post) => (
          <div key={post.id} className="my-6">
             <PostItems {...post} isCard={true}/>
          </div>
        ))}
    </>
  )
}

export default PostLists