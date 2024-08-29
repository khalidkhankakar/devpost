import PostCard from "@/components/card/post-card"
import {  getAllPostByTagId } from "@/lib/actions/tag.action"
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const page = async ({ params }: { params: { id: string } }) => {
  const {userId} = auth();
  let mongoCurrentUser:any;
  if (userId) {
    mongoCurrentUser = await getUserByClerkId(userId);
  }

  const {posts} = await getAllPostByTagId(params.id)
  return (
    <main className="flex items-center flex-col gap-y-2 w-full mt-6 mb-32">
      {
        posts.post.map((post:any)=>{
          return <PostCard post={JSON.stringify(post)} key={post._id} mongoCurrentUser={mongoCurrentUser?JSON.stringify(mongoCurrentUser):null} />
        })
      }
    </main>
  )
}

export default page
