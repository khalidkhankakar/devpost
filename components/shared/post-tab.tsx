
import React, { Suspense } from "react";
import NoResult from "./no-result";
import PostCard from "../card/post-card";
import { getPostByUser } from "@/lib/actions/post.action";

const PostTab = async ({ userId }:{userId:string}) => {
  const userPosts = await getPostByUser(userId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {(!userPosts.posts || userPosts.posts.length <= 0) && (
        <NoResult msg={"No post found!"} />
      )}
      {userPosts.posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Suspense>
  );
};

export default PostTab;
