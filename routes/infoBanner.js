import express from "express";
import InfoBanner from "../models/InfoBanner.js";

const router = express.Router();

/* GET ALL */
router.get("/", async (req, res) => {
  const data = await InfoBanner.find().sort({ position: 1 });
  res.json(data);
});

/* CREATE / UPDATE */
router.post("/", async (req, res) => {
  const { position, icon, title, subtitle } = req.body;

  const updated = await InfoBanner.findOneAndUpdate(
    { position },
    { icon, title, subtitle },
    { upsert: true, new: true }
  );

  res.json(updated);
});

export default router;
