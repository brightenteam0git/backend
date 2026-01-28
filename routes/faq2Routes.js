import express from "express";
import FAQ2 from "../models/FAQ2.js";

const router = express.Router();

/* =========================
   GET FAQ (FRONTEND)
========================= */
router.get("/", async (req, res) => {
  try {
    const faq = await FAQ2.findOne();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch FAQ" });
  }
});

/* =========================
   CREATE / UPDATE FAQ
========================= */
router.post("/", async (req, res) => {
  try {
    const existing = await FAQ2.findOne();

    if (existing) {
      const updated = await FAQ2.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const faq = new FAQ2(req.body);
    await faq.save();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: "Failed to save FAQ" });
  }
});

export default router;
