import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }   // <-- store image path here
});

export default mongoose.model("Category", categorySchema);
