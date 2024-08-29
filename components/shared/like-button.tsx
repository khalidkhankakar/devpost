"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";

import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { addAndRemoveReaction } from "@/lib/actions/post.action";

interface LikeButtonProps {
  postId: string;
  userId?: string | null;
  isLiked?: boolean;
  reactionArr: string[];
}

const LikeButton = ({ postId, userId, isLiked, reactionArr }: LikeButtonProps) => {
  const [action, setAction] = useState(isLiked);
  const [reactions, setReactions] = useState(reactionArr.length);
  const pathname = usePathname()
  const { toast } = useToast();

  const handleLike = async () => {
    if (!userId) {
      toast({
        title: "LogIn",
        description: "Please log in to perform this action",
      });
      return;
    }

    // Optimistically update the UI
    setAction((prev) => !prev);
    setReactions((prev) => (action ? prev - 1 : prev + 1));

    try {
      await addAndRemoveReaction(postId, userId, action,pathname);
    } catch (error) {
      // Revert UI changes if there was an error
      setAction((prev) => !prev);
      setReactions((prev) => (action ? prev + 1 : prev - 1));
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleLike}>
        {action ? (
          <>
            <HeartIcon className="w-5 h-5" fill="red" />
            <span className="sr-only">Liked</span>
          </>
        ) : (
          <>
            <HeartIcon className="w-5 h-5" />
            <span className="sr-only">Like</span>
          </>
        )}
      </Button>
      <div className="text-sm font-medium">
        <span>{reactions}</span> Likes
      </div>
    </>
  );
};

export default LikeButton;
