"use server";
import User from "@/lib/schema/user.model";
import { connectToDB } from "../db";
import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  DeleteUserProps,
  UpdateUserProps,
  userProfileSchema,
} from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { utapi } from "@/utils/uploadthing";
import Post from "@/lib/schema/post.model";
import { ObjectId } from "mongodb";
import Tag from "../schema/tag.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export async function updateUser(params: UpdateUserProps) {
  try {
    await connectToDB();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserProps) {
  try {
    await connectToDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getCurrentMongo = async () => {
  const clerkUser = await currentUser();
  await connectToDB();
  const mongoUser = await User.findOne({ clerkId: clerkUser?.id });
  return mongoUser;
};
export const getUserByClerkId = async (clerkId: string) => {
  await connectToDB();
  const mongoUser = await User.findOne({ clerkId }).populate({
    path: "saved",
    model: Post,
    populate: [
      { path: "createdBy", model: User }, // Populate the 'createdBy' field with User data
      { path: "tags", model: Tag }, // Populate the 'tags' field with Tag data
    ],
  }).populate({path:'userArtical',model:Post, populate: [
    { path: "createdBy", model: User }, // Populate the 'createdBy' field with User data
    { path: "tags", model: Tag }, // Populate the 'tags' field with Tag data
  ]});
  return mongoUser;
};

export const getUserById = async (mongoId: string) => {
  try {
    await connectToDB();
    const getUser = await User.findById(mongoId);
    return { user: getUser };
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserSavedArticals = async (arr: string[]) => {
  try {
    await connectToDB();
    const savedAritical = await Post.find({
      _id: { $in: arr.map((id) => new ObjectId(id)) },
    });
    return savedAritical;
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateUserProfile = async (formData: FormData) => {
  const { success, data, error } = userProfileSchema.safeParse({
    coverImg: formData.getAll("coverImg"),
    name: formData.get("name"),
    location: formData.get("location"),
    portfolioLink: formData.get("portfolioLink"),
    bio: formData.get("bio"),
  });

  if (!success) {
    return { error: "Validation failed", details: error.errors };
  }

  try {
    const userProfile: {
      name: string;
      location: string | null;
      portfolioLink: string | null;
      bio: string | null;
      coverImg?: string; // Add the optional coverImg property
    } = {
      name: data.name,
      location: data.location,
      portfolioLink: data.portfolioLink,
      bio: data.bio,
    };

    if (data.coverImg.length > 0) {
      const response = await utapi.uploadFiles(data.coverImg[0]);

      if (response?.data?.url) {
        userProfile.coverImg = response.data.url; // No more TypeScript error
      }
    }

    await connectToDB();
    const updatedUser = await User.findByIdAndUpdate(
      formData.get("userId"),
      userProfile,
      { new: true }
    );
    console.log(updatedUser);
    const clerkUser = await currentUser();
    revalidatePath(`/profile/${clerkUser?.id}`);
    return { success: true, user: updatedUser };
  } catch (err) {
    return { error: "Post creation failed", details: err };
  }
};


export const saveUserPost = async (userId: string, postId: string) => {
  try {
    await connectToDB();
    const savePost = User.findByIdAndUpdate(userId, {
      $push: { saved: { postId } },
    });
    return { success: true };
  } catch (error: any) {
    throw Error(error);
  }
};

export const unsaveUserPost = async (
  userId: string,
  postId: string,
  path: string
) => {
  try {
    await connectToDB();
    const savePost = User.findByIdAndUpdate(userId, {
      $pull: { saved: { postId } },
    });
    revalidatePath(path);
    return { success: true };
  } catch (error: any) {
    throw Error(error);
  }
};
