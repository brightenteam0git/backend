import mongoose from "mongoose";

const featuredSectionSchema = new mongoose.Schema({
  heading: String,
  label: String,
  description: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});

export default mongoose.model("DisplayProduct", featuredSectionSchema);
