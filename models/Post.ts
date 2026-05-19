import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);