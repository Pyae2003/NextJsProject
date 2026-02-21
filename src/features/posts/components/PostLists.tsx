"use server";

import SearchInput from "@/components/SearchInputComponent";
import { getPosts, PaginatedPosts } from "../queries/get-posts";
import PostItems from "./PostItems";
import { searchParams } from "@/types/searchParams";
import SortingBox from "@/components/SortingBox";
import CustomPagination from "@/components/CustomPagination";

type options = {
  userId?: string | undefined;
  searchParams: searchParams;
};

const PostLists = async ({ userId = undefined, searchParams }: options) => {
  const { posts , currentPage , totalPages  } = (await getPosts(userId, searchParams)) as PaginatedPosts;

  return (
    <>
      <SearchInput placeholder={"search with title..."} />
      <SortingBox
        defaultValue={"desc"}
        options={[
          { label: "Newest", value: "desc" },
          { label: "Oldest", value: "asc" },
        ]}
      />
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="my-6">
            <PostItems {...post} isCard={true} />
          </div>
        ))}

        <CustomPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default PostLists;
