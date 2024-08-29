import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/utils/constant";
import { z } from "zod";

import { ObjectId } from 'mongodb'; // Import ObjectId if using MongoDB's ObjectId

// Define the interface for the object
export interface PostProps {
  _id: ObjectId; // or string if you're converting ObjectId to string
  createdBy: ObjectId; // or string
  coverImg: string;
  title: string;
  tags: string[]; // Assuming tags is an array of strings
  articalDetails: string;
  createdAt: Date;
  comments:any[];
  reactions: any[];

  __v: number;
}


export interface CreateUserParams {
    clerkId: string;
    name: string;
    email: string;
    profileUrl: string;
  }
  export interface UpdateUserProps {
    clerkId: string;
    updateData: { name: string; email: string; profileUrl: string };
    path: string;
  }
  export interface DeleteUserProps {
    clerkId: string;
  }
  
  export const articalSchema = z.object({
    coverImg: z.optional(
      z
        .any()
        .refine(
          (files) =>
            !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
          {
            message: "Max image size is 4MB.",
          }
        )
        .refine(
          (files) =>
            !files ||
            files.length === 0 ||
            ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type),
          {
            message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
          }
        )
    ),
    title: z.string().min(2).max(50),
    tags: z.string().min(2).max(50),
    articalDetails: z.string().min(100),
  });

  export const commentSchema = z.object({
    comment:z.string().min(10,'minimum lenght is 10').max(150, 'maximum length is 150')
  })




  export const userProfileSchema = z.object({
    coverImg: z.optional(
      z
        .any()
        .refine(
          (files) =>
            !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
          {
            message: "Max image size is 4MB.",
          }
        )
        .refine(
          (files) =>
            !files ||
            files.length === 0 ||
            ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type),
          {
            message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
          }
        )
    ),
    name: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    portfolioLink: z.string().min(3),
    bio: z.string().min(30).max(200),
  });

  export interface SearchParamsProps {
    searchParams: { [key: string]: string | undefined };
  }