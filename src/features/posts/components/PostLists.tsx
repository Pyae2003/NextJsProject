"use server"
import { getPosts } from "../queries/get-posts"
import PostItems from "./PostItems"

const PostLists = async () => {
  const data = await getPosts();
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