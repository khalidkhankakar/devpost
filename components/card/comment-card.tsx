"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AddCommment from "../forms/add-comment";
import { formatMongoDBDate } from "@/utils/constant";
interface Comment {
  user: { id: string; name: string; profileUrl: string };
  commentText: string;
  createdAt: string;
  commentId:string
}

interface CommentCardProps {
  comment: Comment;
  currentUser?: string|null;
  postId: string;
}

const CommentCard = ({ comment, currentUser, postId }: CommentCardProps) => {
  const [editComment, setEditComment] = useState<boolean>(false);

  return (
    <>
      {!editComment ? (
        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={comment.user.profileUrl}
                alt={comment.user.name}
              />
              <AvatarFallback>{comment.user.name}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{comment.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatMongoDBDate(String(comment.createdAt))}
                </div>
                {comment.user.id === currentUser && (
                  <p
                    onClick={() => setEditComment(true)}
                    className="text-xs text-muted-foreground"
                  >
                    edit
                  </p>
                )}
              </div>
              <p>{comment.commentText}</p>
            </div>
          </div>
        </div>
      ) : (
        <AddCommment
          postId={postId}
          type={"edit"}
          commentText={comment.commentText}
          userId={currentUser?currentUser:null}
          commentId={comment.commentId}
          setEditComment={setEditComment}
        />
      )}
    </>
  );
};

export default CommentCard;
