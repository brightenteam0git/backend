import express from "express";
import Category from "../models/CategoryModel.js";
import SubCategory from "../models/Subcategory.js";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting Category ID:", req.params.id);

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Delete subcategories linked to this category
    await SubCategory.deleteMany({ group: category.name });

    // Delete products linked to this category
    await Product.deleteMany({ group: category.name });

    res.json({
      message:
        "Category + subcategories + products deleted successfully",
    });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});





// ADD CATEGORY (WITH IMAGE)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name required" });

    const exists = await Category.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const newCat = new Category({
      name,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newCat.save();

    res.json(newCat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE CATEGORY NAME */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const update = { name: req.body.name.trim() };

    if (req.file) {
      update.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


export default router;
