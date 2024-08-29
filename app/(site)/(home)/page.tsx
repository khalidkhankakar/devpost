
import PostCard from "@/components/card/post-card";
import Filter from "@/components/shared/filter";
import NoResult from "@/components/shared/no-result";
import { HOME_FILTERS } from "@/utils/constant/filters";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { getAllPost, getPostByFilters } from "@/lib/actions/post.action";

export default async function Home({searchParams}:SearchParamsProps) {
  const {userId} = auth();
  let mongoCurrentUser:any;
  if (userId) {
    mongoCurrentUser = await getUserByClerkId(userId);
  }

  let allPost:any=[];
  if(searchParams?.filter) {
    allPost = await getPostByFilters(searchParams?.filter)
  } else {
    allPost = await getAllPost();
  }

  return (
    <main className="flex items-center flex-col gap-y-2 w-full mb-32">
      <div className="self-center my-4">
        <Filter filters={HOME_FILTERS} />
      </div>
      {(!allPost.posts || allPost.posts.length<=0) && <NoResult msg={'No post found!'} />}
      {
        allPost.posts.map((post:any)=>(
          <PostCard key={post._id} post={JSON.stringify(post)} mongoCurrentUser={mongoCurrentUser?JSON.stringify(mongoCurrentUser):null}  />
        ))
      }
    </main>
  );
}
