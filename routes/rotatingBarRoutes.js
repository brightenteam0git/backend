import express from "express";
import RotatingBar from "../models/rotatingBar.js";

const router = express.Router();

/* GET rotating bar */
router.get("/", async (req, res) => {
  try {
    const data = await RotatingBar.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* CREATE / UPDATE rotating bar */
router.post("/", async (req, res) => {
  try {
    const existing = await RotatingBar.findOne();

    if (existing) {
      const updated = await RotatingBar.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const created = await RotatingBar.create(req.body);
    res.json(created);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
