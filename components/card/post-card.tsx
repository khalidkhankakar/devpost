"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit3, MessageCircleIcon, Save, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { PostProps } from "@/types";
import { formatMongoDBDate } from "@/utils/constant";
import Link from "next/link";
import LikeButton from "../shared/like-button";
import { useToast } from "../ui/use-toast";
import { deletePostById } from "@/lib/actions/post.action";
import { saveUserPost, unsaveUserPost } from "@/lib/actions/user.action";
export default function PostCard({
  post,
  mongoCurrentUser,
}: {
  post: string;
  mongoCurrentUser?: string | null;
}) {
  let parsePost = JSON.parse(post);
  let parseMongoCurrentUser = mongoCurrentUser && JSON.parse(mongoCurrentUser);
  const { toast } = useToast();
  const handleDelete = async (postId: string) => {
    deletePostById(postId)
      .then(() =>
        toast({
          title: "Post is delete successfull",
        })
      )
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
        })
      );
  };
  const handleSaveAndUnsavePost = async (
    userId: string,
    postId: string,
    type: string
  ) => {
    if (!userId || !mongoCurrentUser) {
      return toast({
        title: "LogIn",
        description: "You should be login to perform this action",
      });
    }

    if (type === "save") {
      saveUserPost(userId, postId)
        .then(() =>
          toast({
            title: "Post is save successfull",
            description: "Check it in save collection",
          })
        )
        .catch(() =>
          toast({
            variant: "destructive",
            title: "Something went wrong",
          })
        );
      return;
    }
    unsaveUserPost(userId, postId, "/saved")
      .then(() =>
        toast({
          title: "Post is unsave successfull",
          description: "Check it in save collection",
        })
      )
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Something went wrong",
        })
      );
    return;
  };
  try {
    return (
      <Card className="w-full relative max-w-md md:max-w-xl lg:max-w-3xl bg-muted/40">
        <CardContent className="grid gap-6 p-6 md:p-8">
          <div className="space-y-2">
            <Link
              href={`/artical-details/${parsePost._id}`}
              className="text-2xl hover:underline font-bold md:text-3xl"
            >
              {parsePost.title}
            </Link>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {parsePost?.tags?.map((tag: any) => (
                <Badge key={tag._id} variant={"secondary"}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 border">
                <AvatarImage
                  src={parsePost.createdBy.profileUrl}
                  alt={parsePost.createdBy.name}
                />
                <AvatarFallback>{parsePost.createdBy.name}</AvatarFallback>
              </Avatar>
              <span>{parsePost.createdBy.name}</span>
            </div>
            {parsePost?.createdAt && (
              <span>{formatMongoDBDate(String(parsePost.createdAt))}</span>
            )}
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="w-4 h-4" />
              <span>{parsePost.comments.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <LikeButton
                postId={String(parsePost._id)}
                reactionArr={parsePost.reactions}
                isLiked={
                  mongoCurrentUser
                    ? parsePost.reactions.includes(parseMongoCurrentUser._id)
                    : false
                }
                userId={
                  mongoCurrentUser ? String(parseMongoCurrentUser._id) : null
                }
              />
            </div>
          </div>
          {mongoCurrentUser &&
           
              <div className="space-x-3 absolute top-3 right-5  flex items-center">
                { String(parseMongoCurrentUser._id) ===
                 String(parsePost.createdBy._id) && (
               <> <Link href={`/create-post/edit/${parsePost._id}`}>
               <Edit3 color="green" size={18} className="cursor-pointer" />
             </Link>
             <Trash2
               onClick={() => handleDelete(parsePost._id)}
               color="red"
               size={18}
               className="cursor-pointer"
             /></>
                 )}
                <Save
                  onClick={() => handleSaveAndUnsavePost(parseMongoCurrentUser._id,parsePost._id,'save')}
                  color="gray"
                  size={18}
                  className="cursor-pointer"
                />
                {/* TODO: also handle the unsaved post */}

              </div>
            }
        </CardContent>
      </Card>
    );
  } catch (error: any) {
    return <div>Error loading post: {error.message}</div>;
  }
}
