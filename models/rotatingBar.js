import mongoose from "mongoose";

const rotatingItemSchema = new mongoose.Schema({
  icon: String,   // fa-solid fa-leaf
  title: String,  // 100% NATURAL AND FRESH
});

const rotatingBarSchema = new mongoose.Schema({
  items: [rotatingItemSchema],
});

export default mongoose.model("RotatingBar", rotatingBarSchema);
