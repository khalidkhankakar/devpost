import { getCurrentMongo } from "@/lib/actions/user.action";
import ArticalExplanation from "@/components/shared/artical-explanation";
import { getPostById } from "@/lib/actions/post.action";

export default async function page({ params }: { params: { id: string } }) {
  const {post} = await getPostById(params.id)
  const mongoUser = await getCurrentMongo();

  
  return (
    <div className="mb-32">
        <ArticalExplanation post={JSON.stringify(post)} currentUser={mongoUser ? String(mongoUser._id):null } />
    </div>
  )
}

