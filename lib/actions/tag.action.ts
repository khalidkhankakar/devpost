"use server";
import Tag from "@/lib/schema/tag.model";
import { connectToDB } from "../db";
import Post from "../schema/post.model";
import User from "../schema/user.model";

export const findTagById = async (tagIdArr: string[]) => {
  try {
    await connectToDB();
    const allTags = [];
    for (const singleTag of tagIdArr) {
      const getTag = await Tag.findById(singleTag);
      allTags.push(getTag.name);
    }
    return { tags: allTags };
  } catch (error: any) {
    throw Error(error);
  }
};

export const getAllTags = async () => {
  try {
    await connectToDB();
    const allTags = await Tag.find({});
    return { tags: allTags };
  } catch (error: any) {
    throw Error(error);
  }
};

export const getTagsByFilters = async (filter: string) => {
  try {
    let sortOptions = {};
    let pipeline:any = [];

    switch (filter) {
      case "recent":
        sortOptions = { createdAt: -1 }; // Newest posts first
        break;
      case "oldest":
        sortOptions = { createdAt: 1 }; // Oldest posts first
        break;
      case "popular":
        // TODO: refactor this code to
        pipeline = [
          {
            $addFields: {
              postsCount: { $size: "$post" },
            },
          },
          { $sort: { postsCount: -1 } },
        ];
        break;
      default:
        throw new Error("Invalid filter type");
    }

    let tags;
    if (pipeline.length > 0) {
      tags = await Tag.aggregate(pipeline).exec();
    } else {
      tags = await Tag.find().sort(sortOptions).exec();
    }

    return { tags };
  } catch (error: any) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
};

export const getAllPostByTagId = async (tagId: string) => {
  try {
    await connectToDB();
    const tagPosts = await Tag.findById(tagId).populate({
      path: "post", // Assuming the posts field in the Tag model is named 'posts'
      model: Post,
      populate: [
        { path: "createdBy", model: User }, // Populate the 'createdBy' field with User data
        { path: "tags", model: Tag } // Populate the 'tags' field with Tag data
      ]
    });
    return { posts: tagPosts };
  } catch (error: any) {
    console.log(error)
    throw Error(error);
  }
};
