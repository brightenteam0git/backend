import mongoose from "mongoose";
import dotenv from "dotenv";
import Subcategory from "./models/Subcategory.js";
import staticProducts from "../src/data/staticProducts.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to DB");

  await Subcategory.deleteMany();
  console.log("Old subcategories removed.");

  let insertCount = 0;

  for (const group in staticProducts) {
    const groupData = staticProducts[group];

    for (const sub in groupData) {
      await Subcategory.create({
        group,
        subCategory: sub,
      });
      insertCount++;
    }
  }

  console.log(`Inserted ${insertCount} subcategories.`);
  process.exit();
});
