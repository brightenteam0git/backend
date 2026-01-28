import mongoose from "mongoose";

const infoBannerSchema = new mongoose.Schema({
  position: { type: Number, required: true, unique: true },
  icon: String,
  title: String,
  subtitle: String,
});

export default mongoose.model("InfoBanner", infoBannerSchema);
