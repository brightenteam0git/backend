// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  group: String,         // Dog / Cat / Grooming / Toys
  subCategory: String,   // ADULT DOGS-SMALL BREEDS (string)
  title: String,
  desc: String,
  subdesc: String,
  img: String,
  sizePrices: {
    type: Map,
    of: Number,
    default: {},
  },
});

export default mongoose.model("Product", productSchema);
