
import { fetchAllComments } from "@/lib/actions/post.action";
import CommentCard from "../card/comment-card";


const ShowComments = async ({commentArr,currentUser,postId}:{currentUser?:string|null;commentArr:any[];postId:string;}) => {
  const comments = await fetchAllComments(commentArr)
  return (
    <>
    {  comments.comments?.map((singleComment)=>(
        <CommentCard key={singleComment.user.id} comment={singleComment} currentUser={currentUser?currentUser:null} postId={postId} />
      ))
      
      }
    </>
  )
}

export default ShowComments
