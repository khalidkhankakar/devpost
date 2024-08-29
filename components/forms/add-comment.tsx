"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/types";
import { z } from "zod";
import { useTransition } from "react";
import { toast, useToast } from "../ui/use-toast";
import { addCommentToPost, updateCommentToPost } from "@/lib/actions/post.action";
interface AddCommentProps {
  commentId: string | null;
  type?: string | null;
  commentText?: string | null;
  postId: string;
  userId?: string|null;
  setEditComment?: (editState: boolean) => void;
}

const AddCommment = ({
  commentText,
  type,
  postId,
  userId,
  setEditComment,
  commentId,
}: AddCommentProps) => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const {toast} = useToast()
  const defaultCommentValue = commentText ? commentText : "";
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: defaultCommentValue,
    },
  });
  async function onSubmit(values: z.infer<typeof commentSchema>) {
    if (!userId || !postId || userId===null) {
      toast({
        title:'LogIn',
        description:'Please login to perform this action'
      })
      return;
    }
    //  edit the comment to post
    if (type === "edit") {
      if (!commentId) return;
      startTransition(() => {
        updateCommentToPost(postId, userId, values.comment, commentId, pathname)
          .then((res) => {
            console.log(res);
            form.reset();
          })
          .catch((err) => console.log(err));
      });
      if (setEditComment) {
        setEditComment(false); // Call only if setEditComment is defined
      }
      return;
    }

    // TODO: add comment to post
    startTransition(() => {
      addCommentToPost(postId, userId, values.comment, pathname)
        .then((res) => {
          console.log(res);
          form.reset();
        })
        .catch((err) => console.log(err));
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write your comment..."
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending ? "loading..." : "Submit Comment"}
        </Button>
      </form>
    </Form>
  );
};

export default AddCommment;
