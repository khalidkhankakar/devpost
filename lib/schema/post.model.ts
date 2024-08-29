import mongoose, { model, models, Schema } from "mongoose";

const PostShcema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImg: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  articalDetails: {
    type: String,
    required: true,
  },
  reactions: [
    {

        type: Schema.Types.ObjectId,
        ref: "User",
    }
  ],
  comments: [
    {
      content: { type: String },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt:{type:Date, default:Date.now}
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model("Post", PostShcema);
export default Post;
