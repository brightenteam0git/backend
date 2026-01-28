import mongoose from "mongoose";
import Product from "./models/Product.js"; // adjust path if needed

await mongoose.connect("mongodb://127.0.0.1:27017/petshop");

const mappings = {
  "adult dog - small breeds": "ADULT DOGS-SMALL BREEDS",
  "adult dog - medium and large breeds": "ADULT DOGS-MEDIUM AND LARGE BREEDS",
  "grain free dog food": "GREIN FREE DOG FOOD",
  "supplements and treats": "SUPPLIMENTS AND TREETS"
};

for (const [oldName, newName] of Object.entries(mappings)) {
  const result = await Product.updateMany(
    { subCategory: oldName },
    { $set: { subCategory: newName } }
  );
  console.log(`✅ Updated ${result.modifiedCount} documents: ${oldName} → ${newName}`);
}

mongoose.disconnect();
