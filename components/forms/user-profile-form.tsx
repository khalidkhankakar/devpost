"use client";
import { useTransition } from "react";
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
import { useToast } from "../ui/use-toast";
import ImageUploader from "./image-uploader";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { userProfileSchema } from "@/types";
import { updateUserProfile } from "@/lib/actions/user.action";

const UserProfileForm = ({
mongoUser
}: {
mongoUser:any
}) => {
  const {userId} = useAuth()
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      coverImg:[],
      name:mongoUser?.name ? mongoUser?.name : '' ,
      location:mongoUser?.location ? mongoUser?.location : '',
      portfolioLink:mongoUser?.portfolioLink ? mongoUser?.portfolioLink : '' ,
      bio:mongoUser?.bio ? mongoUser?.bio : '' ,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof userProfileSchema>) {
    if (!mongoUser._id) return;

    const formData = new FormData();
    if (values.coverImg.length > 0) {
      formData.append("coverImg", values.coverImg[0]);
    }
    formData.append("userId", mongoUser._id);
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("portfolioLink", values.portfolioLink);
    formData.append("bio", values.bio);

    // TODO: update the user profile
    startTransition(() => {
      updateUserProfile(formData)
        .then(() => {
          toast({
            title: "profile successfully",
          });
          form.reset();
          router.push(`/profile/${userId}`);
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
        <div className="text-3xl font-bold">Customize your Profile</div>
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
                  <ImageUploader fieldChange={field.onChange} mediaUrl={mongoUser?.coverImg?mongoUser?.coverImg:null} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" className="ml-auto">
              {isPending ? "loading..." : "Publish Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
