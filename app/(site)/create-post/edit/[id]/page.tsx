import CreateArtical from '@/components/forms/create-artical'
import { getPostById } from '@/lib/actions/post.action'

const page = async ({ params }: { params: { id: string } }) => {
    const {post} = await getPostById(params.id)
  return (
    <div>
      <CreateArtical post={JSON.stringify(post)} mongoCurrentUserId={String(post.createdBy._id)} type={'edit'}  />
    </div>
  )
}

export default page
