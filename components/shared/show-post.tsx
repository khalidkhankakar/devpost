
import PostCard from "../card/post-card";
import { Suspense } from "react";
import { CardSkeleton } from "@/app/(site)/(home)/loading";
import { getPostsByArr } from "@/lib/actions/post.action";
const ShowPost = async ({ postArr }: { postArr: any[] }) => {
  const allPosts = await getPostsByArr(postArr);
  return (
    <Suspense fallback={<CardSkeleton />}>
      {allPosts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </Suspense>
  );
};

export default ShowPost;
