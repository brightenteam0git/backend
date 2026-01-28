import express from "express";
import DisplayProduct from "../models/displayproduct.js";

const router = express.Router();

/* GET featured section */
router.get("/", async (req, res) => {
  try {
    const data = await DisplayProduct.findOne().populate("products");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* CREATE / UPDATE featured section */
router.post("/", async (req, res) => {
  try {
    const existing = await DisplayProduct.findOne();

    if (existing) {
      const updated = await DisplayProduct.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const created = await DisplayProduct.create(req.body);
    res.json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
