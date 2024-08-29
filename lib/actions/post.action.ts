"use server";
import Post from "@/lib/schema/post.model";
import Tag from "@/lib/schema/tag.model";
import { articalSchema } from "@/types";
import { utapi } from "@/utils/uploadthing";
import { connectToDB } from "../db";
import { revalidatePath } from "next/cache";
import User from "@/lib/schema/user.model";

export const getPostByFilters = async (filter: string) => {
  try {
    let sortOptions = {};
    let pipeline: any = [];

    switch (filter) {
      case "recent":
        sortOptions = { createdAt: -1 }; // Newest posts first
        break;
      case "oldest":
        sortOptions = { createdAt: 1 }; // Oldest posts first
        break;
      case "most_commented":
        pipeline = [
          {
            $addFields: {
              commentsCount: { $size: "$comments" },
            },
          },
          { $sort: { commentsCount: -1 } },
        ];
        break;
      case "most_liked":
        pipeline = [
          {
            $addFields: {
              likesCount: {
                $size: {
                  $filter: {
                    input: "$reactions",
                    as: "reaction",
                    cond: { $eq: ["$$reaction.likeType", "like"] },
                  },
                },
              },
            },
          },
          { $sort: { likesCount: -1 } },
        ];
        break;
      default:
        throw new Error("Invalid filter type");
    }

    let posts;
    if (pipeline.length > 0) {
      posts = await Post.aggregate(pipeline).exec();

      // Manually populate fields after aggregation
      posts = await Post.populate(posts, [
        { path: "createdBy", model: User },
        { path: "tags", model: Tag },
      ]);
    } else {
      posts = await Post.find()
        .populate({ path: "createdBy", model: User })
        .populate({ path: "tags", model: Tag })
        .sort(sortOptions)
        .exec();
    }

    return { posts };
  } catch (error: any) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
};

export const deletePost = async (postId: string, path: string) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(postId);
    revalidatePath(path);
    return { success: true };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatePost = async (formData: FormData) => {
  const { success, data, error } = articalSchema.safeParse({
    coverImg: formData.getAll("coverImg"),
    title: formData.get("title"),
    tags: formData.get("tags"),
    articalDetails: formData.get("articalDetails"),
  });

  if (!success) {
    return { error: "Validation failed", details: error.errors };
  }
  console.log("DATA", data);
  try {
    console.log("TRY");
    // Build the post object with the fields to be updated
    const postObj: any = {
      title: data.title,
      articalDetails: data.articalDetails,
    };

    // Handle cover image upload if there's a new image
    if (data.coverImg.length > 0) {
      const response = await utapi.uploadFiles(data.coverImg[0]);

      if (response?.data?.url) {
        postObj.coverImg = response.data.url;
      }
    }

    // Process and update tags
    const Alltags = data.tags.split(",").map((tag) => {
      return tag.startsWith("#") ? tag.trim() : `#${tag.trim()}`;
    });

    const tagIds = [];

    // Connect to the database
    await connectToDB();
    // Update the post with new data
    const updatedPost = await Post.findByIdAndUpdate(
      formData.get("postId"),
      postObj,
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return { error: "Post not found" };
    }

    // Update tags
    for (const tag of Alltags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { post: updatedPost._id } },
        { upsert: true, new: true }
      );

      tagIds.push(existingTag._id);
    }

    // Update the post with the new tags
    await Post.findByIdAndUpdate(
      updatedPost._id,
      { $set: { tags: tagIds } }, // Replace the tags array with the new tags
      { new: true }
    );

    // Revalidate the path to reflect the changes in the cache or static pages
    revalidatePath(`/`);

    return { success: true, post: updatedPost };
  } catch (err) {
    console.log(err);
    return { error: "Post update failed", details: err };
  }
};

export const createPostDB = async (formData: FormData) => {
  const { success, data, error } = articalSchema.safeParse({
    coverImg: formData.getAll("coverImg"),
    title: formData.get("title"),
    tags: formData.get("tags"),
    articalDetails: formData.get("articalDetails"),
  });
  console.log("DATA ", data);

  if (!success) {
    return { error: "Validation failed", details: error.errors };
  }

  try {
    const postObj = {
      createdBy: formData.get("userId"),
      title: data.title,
      articalDetails: data.articalDetails,
      coverImg: "",
    };

    const Alltags = data.tags.split(",").map((tag) => {
      return tag.startsWith("#") ? tag.trim() : `#${tag.trim()}`;
    });

    const tagIds = [];

    if (data.coverImg.length > 0) {
      const response = await utapi.uploadFiles(data.coverImg[0]);

      if (response?.data?.url) {
        postObj.coverImg = response.data.url;
      }
    }
    await connectToDB();
    const createdPost = await Post.create(postObj);

    for (const tag of Alltags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { post: createdPost._id } },
        { upsert: true, new: true }
      );

      tagIds.push(existingTag._id);
    }
    await Post.findByIdAndUpdate(createdPost._id, {
      $push: { tags: { $each: tagIds } },
    });
    const userId = formData.get("userId");
    await User.findByIdAndUpdate(
      userId,
      { $push: { userArtical: createdPost._id } },
      { new: true }
    );

    revalidatePath("/");
    return { success: true, post: createdPost };
  } catch (err) {
    return { error: "Post creation failed", details: err };
  }
};

export const getAllPost = async () => {
  try {
    await connectToDB();
    const posts = await Post.find({})
      .populate({ path: "createdBy", model: User })
      .populate({ path: "tags", model: Tag });
    return { posts };
  } catch (error: any) {
    throw Error(error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    await connectToDB();
    const post = await Post.findById(postId)
      .populate({ path: "createdBy", model: User })
      .populate({ path: "tags", model: Tag });
    return { post };
  } catch (error: any) {
    throw Error(error);
  }
};

// TODO: extent this function
export const getPostByUser = async (userId: string) => {
  try {
    await connectToDB();
    const posts = await Post.find({ createdBy: userId });
    return { posts };
  } catch (error: any) {
    throw Error(error);
  }
};

export const getPostsByArr = async (postArr: string[]) => {
  try {
    await connectToDB();
    const allPosts = await Post.find({
      _id: { $in: postArr },
    });

    return allPosts;
  } catch (error: any) {
    throw Error(error);
  }
};

export const addAndRemoveReaction = async (
  postId: string,
  userId: string,
  isLiked: boolean,
  path: string
) => {
  try {
    await connectToDB();

    const update = isLiked
      ? { $pull: { reactions: userId } }
      : { $addToSet: { reactions: userId } };
    const updatedPost = await Post.findByIdAndUpdate(postId, update, {
      new: true,
    });
    const updateUser = isLiked
      ? { $pull: { liked: updatedPost._id } }
      : { $pull: { liked: updatedPost._id } };
    await User.findByIdAndUpdate(userId, updateUser, { new: true });
    revalidatePath(path);
    return {
      post: updatedPost,
      message: isLiked ? "Reaction removed" : "Reaction added",
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// [
//   {userId:
//     content:
//     createdAt
//   }
// ]
export const fetchAllComments = async (commentsArr: any[]) => {
  try {
    await connectToDB();
    let allComments = [];
    for (const comment of commentsArr) {
      const commentUser = await User.findById(comment.userId);
      let newObj = {
        user: {
          id: commentUser._id,
          name: commentUser.name,
          profileUrl: commentUser.profileUrl,
        },
        commentText: comment.content,
        createdAt: comment.createdAt,
        commentId: String(comment._id),
      };
      allComments.push(newObj);
    }

    return { comments: allComments };
  } catch (error: any) {
    throw Error(error);
  }
};

export const addCommentToPost = async (
  postId: string,
  userId: string,
  comment: string,
  pathname: string
) => {
  try {
    await connectToDB();
    const query = { $push: { comments: { content: comment, userId } } };
    const updatedPost = await Post.findByIdAndUpdate(postId, query, {
      new: true,
    });

    revalidatePath(pathname);
    return { msg: "comment successfully" };
  } catch (error: any) {
    throw Error(error);
  }
};

export const updateCommentToPost = async (
  postId: string,
  userId: string,
  comment: string,
  commentId: string,
  pathname: string
) => {
  try {
    await connectToDB();

    // Fetch the post by postId
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Find the comment by commentId
    const commentIndex = post.comments.findIndex(
      (c: any) =>
        c._id.toString() === commentId && c.userId.toString() === userId
    );

    if (commentIndex === -1) {
      throw new Error(
        "Comment not found or you are not authorized to update this comment"
      );
    }

    // Update the comment content
    post.comments[commentIndex].content = comment;

    // Save the updated post
    await post.save();

    // Optionally revalidate the cache for the path
    revalidatePath(pathname);

    return { msg: "Comment updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCommentToPost = async (
  postId: string,
  commentId: string,
  pathname: string
) => {
  try {
    await connectToDB();
    // Fetch the post by postId
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    // Find the comment by commentId
    const filteredComments = post.comments.filter(
      (c: any) => c._id.toString() != commentId
    );
    // Update the comment content
    post.comments = filteredComments;
    // Save the updated post
    await post.save();
    // Optionally revalidate the cache for the path
    revalidatePath(pathname);
    return { msg: "Comment updated successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deletePostById = async (postId:string) => {
  try {
    await connectToDB();
    await Post.findByIdAndDelete(postId);
    // TODO also remove from user and saved user of this post id
    revalidatePath("/");
    
    return { msg: "post successfully deleted" };
  } catch (error: any) {
    throw Error(error);
  }
};
