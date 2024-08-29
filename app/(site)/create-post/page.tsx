import { connectToDB } from '@/lib/db';
import { getCurrentMongo } from '@/lib/actions/user.action';
import CreateArtical from '@/components/forms/create-artical'

const CreatePost = async () => {
  await connectToDB()
  const mongoUser = await getCurrentMongo();
  console.log(mongoUser);
  

  
  return (
    <div>
      <CreateArtical mongoCurrentUserId={String(mongoUser._id)} />
    </div>
  )
}

export default CreatePost
