import mongoose from "mongoose";
import Category from "./models/CategoryModel.js";

await mongoose.connect("mongodb://127.0.0.1:27017/petshop");

const categories = await Category.find({ image: { $exists: false } });

for (const cat of categories) {
  cat.image = `${cat.name.toLowerCase()}.jpg`;
  await cat.save();
}

console.log("Categories updated");
process.exit();
