// models/Subcategory.js
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  group: String,        // Dog / Cat / Grooming / Toys
  subCategory: String,  // ADULT DOGS-SMALL BREEDS
});

export default mongoose.model("SubCategory", subCategorySchema);
