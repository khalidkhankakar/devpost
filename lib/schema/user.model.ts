import { model, models, Schema } from "mongoose";
import { string } from "zod";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: { type: String },
  coverImg: { type: String },
  location: { type: String },
  portfolioLink: { type: String },
  saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  liked: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  profileUrl: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  userArtical: [{
type: Schema.Types.ObjectId, ref: "Post"
  }],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
