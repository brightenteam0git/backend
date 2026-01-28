import express from "express";
import SubCategory from "../models/Subcategory.js";
import Product from "../models/Product.js";

const router = express.Router();

router.delete("/group/:group/:subCategory", async (req, res) => {
  try {
    const { group, subCategory } = req.params;

    const formattedSub = subCategory.replace(/\s+/g, " ").trim().toUpperCase();

    const deletedSub = await SubCategory.findOneAndDelete({
      group,
      subCategory: formattedSub,
    });

    if (!deletedSub) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    await Product.deleteMany({ subCategory: formattedSub });

    res.json({
      message: "Sub-category & all related products deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD NEW SUBCATEGORY
router.post("/", async (req, res) => {
  try {
    const { group, subCategory } = req.body;

    if (!group || !subCategory) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const formattedSub = subCategory.replace(/\s+/g, " ").trim().toUpperCase();

    const exists = await SubCategory.findOne({
      group,
      subCategory: formattedSub,
    });

    if (exists) {
      return res.status(409).json({ message: "Sub-category already exists" });
    }

    const saved = await SubCategory.create({
      group,
      subCategory: formattedSub,
    });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

 // Get ALL subcategories
router.get("/", async (req, res) => {
  const subs = await SubCategory.find();
  res.json(subs);
});

router.get("/group/:group", async (req, res) => {
  const group = req.params.group.toUpperCase();

  const subs = await SubCategory.find({
    group: { $regex: new RegExp(`^${group}$`, "i") },
  });

  res.json(subs);
});

/* UPDATE SUB-CATEGORY NAME */
router.put("/group/:group/:oldSub", async (req, res) => {
  try {
    const { group, oldSub } = req.params;
    const { newSubCategory } = req.body;

    if (!newSubCategory?.trim()) {
      return res.status(400).json({ message: "New sub-category name required" });
    }

    const updated = await SubCategory.findOneAndUpdate(
      {
        group: group.toUpperCase(),
        subCategory: oldSub.toUpperCase(),
      },
      {
        subCategory: newSubCategory.trim().toUpperCase(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update sub-category error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
