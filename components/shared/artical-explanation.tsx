import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TagIcon } from "lucide-react";
import Image from "next/image";
import ParsedHTML from "./parsed-html";
import { formatMongoDBDate } from "@/utils/constant";
import LikeButton from "./like-button";
import AddCommment from "../forms/add-comment";
import ShowComment from "./show-comment";

interface Article {
  _id: string;
  createdBy: string;
  coverImg: string;
  title: string;
  tags: string[];
  articalDetails: string;
  createdAt: string;
  __v: number;
  reactions: [];
  comments: [];
}

interface Author {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  profileUrl: string;
  __v: number;
  userArtical: string[];
}

interface ArticalExplanationProps {
  post: string;
  currentUser?: string|null;
}

export default async function ArticalExplanation({
  post,
  currentUser,
}: ArticalExplanationProps) {
  const parsePost = JSON.parse(post)
  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-0 py-4 md:py-7">
      <article className="space-y-6">
        {parsePost?.coverImg && (
          <div className="relative h-36 md:h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={parsePost.coverImg}
              alt="Article Cover"
              width={1280}
              height={720}
              className="object-contain w-full h-full"
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {parsePost.tags.map((tag:any) => (
              <div
                key={tag._id}
                className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm font-medium"
              >
                <TagIcon className="w-4 h-4" />
                {tag.name}
              </div>
            ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {parsePost.title}
          </h1>
        </div>

        <ParsedHTML data={JSON.stringify(parsePost.articalDetails)} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={parsePost.createdBy.profileUrl} alt="Author" />
              <AvatarFallback>{parsePost.createdBy.name}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{parsePost.createdBy.name}</div>
              <div className="text-muted-foreground">
                Published on {formatMongoDBDate(parsePost.createdAt)}
              </div>
            </div>
          </div>

          {/* likeButton commponent */}
          <div className="flex items-center gap-2">
            <LikeButton
              postId={String(parsePost._id)}
              reactionArr={parsePost.reactions}
              isLiked={
                currentUser ? parsePost.reactions.includes(currentUser) : false
              }
              userId={currentUser ? currentUser : null}
            />
          </div>
        </div>
        <div className="border-t pt-6">
          {/* Show comments components */}
          <h3 className="text-xl font-bold">Comments</h3>

          <ShowComment
            currentUser={currentUser ? currentUser : null}
            commentArr={parsePost.comments}
            postId={String(parsePost._id)}
          />

          {/* add comment */}
          <AddCommment
            commentId={null}
            commentText={null}
            type={"create"}
            postId={String(parsePost._id)}
            userId={currentUser}
          />
        </div>
      </article>
    </div>
  );
}
