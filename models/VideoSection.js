import mongoose from "mongoose";

const videoSectionSchema = new mongoose.Schema({
  leftVideo: String,
  rightVideo: String,
  circleText: String,
  heading: String,
  rotationSpeed: {
    type: Number,
    default: 20,
  },
});

export default mongoose.model("VideoSection", videoSectionSchema);
