import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, 
{ timestamps: true}
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;