import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import staticProducts from "../src/data/staticProducts.js";

dotenv.config();

async function migrate() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old products
    await Product.deleteMany();
    console.log("Old products removed.");

    let insertCount = 0;

    // Loop through static products and insert
    for (const group in staticProducts) {
      const groupData = staticProducts[group];

      for (const sub in groupData) {
        const productList = groupData[sub];

        for (const item of productList) {
          await Product.create({
            group,
            subCategory: sub,
            title: item.title,
            desc: item.desc,
            subdesc: item.subdesc,
            img: item.img || "",
            sizePrices: item.sizePrices || {},
          });

          insertCount++;
        }
      }
    }

    console.log(`✅ Migration complete. Inserted ${insertCount} new products.`);
    process.exit(0);

  } catch (error) {
    console.error("❌ Migration error:", error);
    process.exit(1);
  }
}

migrate();
