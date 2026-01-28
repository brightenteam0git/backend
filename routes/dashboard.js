import express from "express";
import Category from "../models/CategoryModel.js";
import SubCategory from "../models/Subcategory.js";
import Product from "../models/Product.js";
import ContactForm from "../models/ContactForm.js";

const router = express.Router();

/* =========================
   DASHBOARD STATS API
========================= */
router.get("/stats", async (req, res) => {
  try {
    const categories = await Category.countDocuments();
    const subCategories = await SubCategory.countDocuments();
    const products = await Product.countDocuments();
    const contactForms = await ContactForm.countDocuments();

    res.status(200).json({
      categories,
      subCategories,
      products,
      contactForms,
    });
  } catch (error) {
    console.error("❌ DASHBOARD ERROR FULL:", error);
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
});

export default router;
