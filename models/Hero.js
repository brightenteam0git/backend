import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  tagline: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Hero", HeroSchema);
