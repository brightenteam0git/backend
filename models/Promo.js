import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema({
  title: String,
  description: String,
  buttonText: String,
  image: String,
});

export default mongoose.model("Promo", PromoSchema);
