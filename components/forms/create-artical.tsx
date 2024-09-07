"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useTransition, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { articalSchema } from "@/types";
import { useToast } from "../ui/use-toast";
import ImageUploader from "./image-uploader";
import { useRouter } from "next/navigation";
import { createPostDB, updatePost } from "@/lib/actions/post.action";

const CreateArtical = ({
  post,
  type,
  mongoCurrentUserId,
}: {
  post?: any;
  type?: string;
  mongoCurrentUserId: string;
}) => {
  console.log("NEW--->>>", post, type, mongoCurrentUserId);
  const parsePost = post && JSON.parse(post || "");
  const router = useRouter();
  const editorRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof articalSchema>>({
    resolver: zodResolver(articalSchema),
    defaultValues: {
      coverImg: [], // Ensure this is an array
      title: parsePost && post ? parsePost.title : "",
      tags: parsePost && post ? parsePost.tags.map((tag: any) => tag.name).join(", ") : "",
      articalDetails:parsePost && post ? parsePost?.articalDetails : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof articalSchema>) {
    if (!mongoCurrentUserId) return;

    const formData = new FormData();
    if (values.coverImg.length > 0) {
      formData.append("coverImg", values.coverImg[0]);
    }
    formData.append("userId", mongoCurrentUserId);
    formData.append("title", values.title);
    formData.append("tags", values.tags);
    formData.append("articalDetails", values.articalDetails);
    if (type === "edit") {
      formData.append("postId", parsePost._id);
      startTransition(() => {
        updatePost(formData)
          .then(() => {
            toast({
              title: "Post updated successfully",
            });
            form.reset();
            router.push(`/`);
          })
          .catch((err) => {
            console.log(err);
            toast({
              variant: "destructive",
              title: "Oops! Something went wrong try again",
            });
          });
      });
      return;
    }
    startTransition(() => {
      createPostDB(formData)
        .then(() => {
          toast({
            title: "Post created successfully",
          });
          form.reset();
          router.push("/");
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Oops! Something went wrong try again",
          });
        });
    });
  }

  return (
    <div className="w-full mx-auto p-6 md:p-10 mb-32">
      <div className="my-2">
        <div className="text-3xl font-bold">
          {type ? "Edit your post" : "Create new post"}
        </div>
        <div>
          {type
            ? "Edit form to publish it"
            : "Fill out the form to publish a new article."}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="coverImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <ImageUploader
                    fieldChange={field.onChange}
                    mediaUrl={parsePost?.coverImg || null}
                  />
                  {/* <Input
                      type="file"
                      accept="image/*"
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        field.onChange(files);
                      }}
                      ref={field.ref}
                    /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="articalDetails"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel>Details</FormLabel>
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={parsePost?.articalDetails || ""}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: "oxide",
                      content_css: "light",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" className="ml-auto">
              {isPending ? "loading..." : type ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateArtical;
