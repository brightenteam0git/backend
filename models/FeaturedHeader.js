import mongoose from "mongoose";

const featuredHeaderSchema = new mongoose.Schema({
  icon: String,
  heading: String,
  description: String,
});

export default mongoose.model("FeaturedHeader", featuredHeaderSchema);
